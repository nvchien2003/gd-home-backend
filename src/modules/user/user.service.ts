import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '../../common/base/base.service';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto, UpdateProfileDto } from './dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { DataSource, FindOneOptions } from 'typeorm';
import { MediasRepository } from '../repository/medias.repository';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mediaRepository: MediasRepository,
    private readonly dataSource: DataSource,
  ) {
    super(userRepository);
  }
  async create(data: CreateUserDto): Promise<User> {
    console.log(data);
    const exists = await this.userRepository.findByEmail(data.email);
    console.log('---> email', exists);
    if (exists) throw new BadRequestException('Email already exists');

    const hash = await bcrypt.hash(data.password, 10);

    return this.userRepository.save({
      ...data,
      password: hash,
    });
  }

  findById(id: string, options?: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      ...options,
    });
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findByEmailWithPassword(email);
  }

  async verify(email: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');

    return this.userRepository.update({ email }, { verify: true });
  }

  // ✅ Update password
  async updatePassword(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');

    const hash = await bcrypt.hash(password, 10);

    return this.userRepository.update({ email }, { password: hash });
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    try {
      console.log('-------update profile', userId, dto);
      let avatar = null;
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) throw new BadRequestException('User not found');

      if (dto.email) {
        const exists = await this.userRepository.findByEmail(dto.email);
        if (exists) throw new BadRequestException('Email already exists');
      }

      if (dto.avatar) {
        avatar = dto.avatar;
      }
      const _dto = { ...dto };
      if (avatar) {
        _dto.avatar = avatar;
      }

      return this.userRepository.update(userId, _dto);
    } catch (error) {
      console.log('error update profile', error);
      throw error;
    }
  }

  // ✅ Check exists
  async exists(email: string) {
    const user = await this.findByEmail(email);
    return !!user;
  }
}
