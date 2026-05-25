import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Property } from '../../database/entities/property.entity';
import { PropertyRepository } from '../repository/property.repository';
import { OwnerRepository } from '../repository/owner.repository';
import {
  CreatePropertyDto,
  GetPropertiesQueryDto,
  PropertyResponseDto,
  UpdatePropertyDto,
} from './dto/property.dto';

@Injectable()
export class PropertyService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly propertyRepository: PropertyRepository,
    private readonly ownerRepository: OwnerRepository,
  ) {}

  async create(dto: CreatePropertyDto): Promise<PropertyResponseDto> {
    const property = await this.dataSource.transaction(async (manager) => {
      const owner = manager.getRepository(this.ownerRepository.target).create({
        name: dto.owner.name,
        image: dto.owner.image,
      });
      const savedOwner = await manager.save(owner);

      const entity = manager.getRepository(this.propertyRepository.target).create({
        title: dto.title,
        location: dto.location,
        price: dto.price,
        pricePerMonth: dto.pricePerMonth,
        beds: dto.beds,
        baths: dto.baths,
        sqft: dto.sqft,
        type: dto.type,
        rating: dto.rating,
        reviewsCount: dto.reviews,
        image: dto.image,
        amenities: dto.amenities ?? [],
        description: dto.description,
        owner: savedOwner,
      });

      return manager.save(entity);
    });

    return this.findOne(property.id);
  }

  async findAll(query: GetPropertiesQueryDto) {
    if (
      query.minPrice !== undefined &&
      query.maxPrice !== undefined &&
      query.minPrice > query.maxPrice
    ) {
      throw new BadRequestException(
        'minPrice must be less than or equal to maxPrice',
      );
    }

    const result = await this.propertyRepository.findAll(query);

    return {
      items: result.items.map((property) => this.toResponse(property)),
      meta: result.meta,
    };
  }

  async findOne(id: number): Promise<PropertyResponseDto> {
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return this.toResponse(property);
  }

  async update(id: number, dto: UpdatePropertyDto): Promise<PropertyResponseDto> {
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    await this.dataSource.transaction(async (manager) => {
      if (dto.owner) {
        property.owner = await manager.save(this.ownerRepository.target, {
          ...property.owner,
          ...dto.owner,
        });
      }

      manager.merge(this.propertyRepository.target, property, {
        title: dto.title,
        location: dto.location,
        price: dto.price,
        pricePerMonth: dto.pricePerMonth,
        beds: dto.beds,
        baths: dto.baths,
        sqft: dto.sqft,
        type: dto.type,
        rating: dto.rating,
        reviewsCount: dto.reviews,
        image: dto.image,
        amenities: dto.amenities,
        description: dto.description,
      });

      await manager.save(property);
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<PropertyResponseDto> {
    const property = await this.findOne(id);
    const result = await this.propertyRepository.deleteById(id);

    if (!result.affected) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  toResponse(property: Property): PropertyResponseDto {
    return {
      id: property.id,
      title: property.title,
      location: property.location,
      price: Number(property.price),
      pricePerMonth: Number(property.pricePerMonth ?? 0),
      beds: Number(property.beds ?? 0),
      baths: Number(property.baths ?? 0),
      sqft: Number(property.sqft ?? 0),
      type: property.type,
      rating: Number(property.rating ?? 0),
      reviews: Number(property.reviewsCount ?? 0),
      image: this.toFullUrl(property.image),
      amenities: Array.isArray(property.amenities) ? property.amenities : [],
      description: property.description,
      owner: {
        name: property.owner?.name ?? '',
        image: this.toFullUrl(property.owner?.image ?? ''),
      },
    };
  }

  private toFullUrl(value: string): string {
    if (!value) {
      return value;
    }

    if (/^https?:\/\//i.test(value)) {
      return value;
    }

    const appUrl = process.env.APP_URL || process.env.BASE_URL;
    if (!appUrl) {
      return value;
    }

    return `${appUrl.replace(/\/$/, '')}/${value.replace(/^\//, '')}`;
  }
}
