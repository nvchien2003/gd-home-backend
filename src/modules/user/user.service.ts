import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '../../common/base/base.service';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(private readonly userRepository: UserRepository) {
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
  async updateProfile(userId: string, data: Partial<User>) {
    return this.userRepository.update({ id: userId }, data);
  }

  // ✅ Check exists
  async exists(email: string) {
    const user = await this.findByEmail(email);
    return !!user;
  }

  async safeUser(user: User) {
    const { password, ...rest } = user;
    return rest;
  }
}
