import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmExModule } from '../../common/typeorm/typeorm-ex.module';
import { UserRepository } from '../repository/user.repository';
import { AuthModule } from '../auth/auth.module';
import { MediasRepository } from '../repository/medias.repository';
@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmExModule.forCustomRepository([UserRepository, MediasRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
