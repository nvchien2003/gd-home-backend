import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentalPost } from '../../database/entities/rental-post.entity';
import { RentalPostImage } from '../../database/entities/rental-post-image.entity';
import {
  CreateRentalPostDto,
  RentalPostQueryDto,
  UpdateRentalPostDto,
} from './dto/rental-post.dto';

@Injectable()
export class RentalPostsService {
  constructor(
    @InjectRepository(RentalPost)
    private readonly rentalPostRepository: Repository<RentalPost>,
    @InjectRepository(RentalPostImage)
    private readonly rentalPostImageRepository: Repository<RentalPostImage>,
  ) {}

  async create(userId: string, dto: CreateRentalPostDto) {
    const post = this.rentalPostRepository.create({
      ...dto,
      beds: dto.beds ?? 1,
      baths: dto.baths ?? 1,
      sqft: dto.sqft ?? 0,
      user: { id: userId },
      images: (dto.images ?? []).map((url, index) =>
        this.rentalPostImageRepository.create({ url, sortOrder: index }),
      ),
    });

    const saved = await this.rentalPostRepository.save(post);
    return this.findOne(saved.id, userId);
  }

  async findAll(query: RentalPostQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const qb = this.rentalPostRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.images', 'images')
      .leftJoin('post.user', 'user')
      .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.avatar'])
      .orderBy('post.createdAt', 'DESC');

    if (query.search) {
      qb.andWhere(
        '(LOWER(post.title) LIKE LOWER(:search) OR LOWER(post.location) LIKE LOWER(:search))',
        { search: `%${query.search}%` },
      );
    }

    if (query.roomType) {
      qb.andWhere('post.roomType = :roomType', { roomType: query.roomType });
    }

    if (query.status) {
      qb.andWhere('post.status = :status', { status: query.status });
    }

    const [items, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items: items.map((item) => this.toResponse(item)),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string, userId?: string) {
    const post = await this.rentalPostRepository.findOne({
      where: { id },
      relations: ['images', 'user'],
    });

    if (!post) {
      throw new NotFoundException('Rental post not found');
    }

    if (userId && post.user.id !== userId) {
      throw new ForbiddenException('You do not have access to this rental post');
    }

    return this.toResponse(post);
  }

  async update(id: string, userId: string, dto: UpdateRentalPostDto) {
    const post = await this.rentalPostRepository.findOne({
      where: { id },
      relations: ['images', 'user'],
    });

    if (!post) {
      throw new NotFoundException('Rental post not found');
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException('You cannot update this rental post');
    }

    Object.assign(post, {
      title: dto.title ?? post.title,
      description: dto.description ?? post.description,
      location: dto.location ?? post.location,
      roomType: dto.roomType ?? post.roomType,
      pricePerMonth: dto.pricePerMonth ?? post.pricePerMonth,
      beds: dto.beds ?? post.beds,
      baths: dto.baths ?? post.baths,
      sqft: dto.sqft ?? post.sqft,
      status: dto.status ?? post.status,
    });

    if (dto.images) {
      await this.rentalPostImageRepository.delete({ rentalPost: { id } });
      post.images = dto.images.map((url, index) =>
        this.rentalPostImageRepository.create({ url, sortOrder: index }),
      );
    }

    await this.rentalPostRepository.save(post);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    await this.rentalPostRepository.delete(id);
    return { id };
  }

  private toResponse(post: RentalPost) {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      location: post.location,
      roomType: post.roomType,
      pricePerMonth: Number(post.pricePerMonth),
      beds: Number(post.beds ?? 0),
      baths: Number(post.baths ?? 0),
      sqft: Number(post.sqft ?? 0),
      status: post.status,
      images: (post.images ?? [])
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((image) => image.url),
      user: post.user
        ? {
            id: post.user.id,
            firstName: post.user.firstName,
            lastName: post.user.lastName,
            avatar: post.user.avatar,
          }
        : undefined,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
