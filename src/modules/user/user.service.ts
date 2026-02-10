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
    const exists = await this.userRepository.findByEmail(data.email);
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

}
