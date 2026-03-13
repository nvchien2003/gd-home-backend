import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '../../common/base/base.service';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto, UpdateProfileDto } from './dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Medias } from '../../database/entities/medias.entity';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(
    private readonly userRepository: UserRepository,
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

  // ✅ Update profile
  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(User, {
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }
      if (dto.avatar) {
        const media = manager.create(Medias, {
          name: 'avatar',
          url: dto.avatar,
          user: user,
        });

        await manager.save(media);

        user.avatar = dto.avatar;
      }

      Object.assign(user, {
        firstName: dto.firstName,
        lastName: dto.lastName,
      });

      return await manager.save(user);
    });
  }

  // ✅ Check exists
  async exists(email: string) {
    const user = await this.findByEmail(email);
    return !!user;
  }
}
