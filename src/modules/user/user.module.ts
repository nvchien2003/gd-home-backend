import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmExModule } from '../../common/typeorm/typeorm-ex.module';
import { UserRepository } from '../repository/user.repository';
@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
