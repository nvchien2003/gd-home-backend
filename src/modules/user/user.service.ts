import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/base.service';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService extends BaseService<User, Repository<User>> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }
}
