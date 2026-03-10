import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './config/redis/redis.module';
import { CommonModule } from './common/common.module';
import { PropertyModules } from './modules/propety/propety.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UserModule,
    RedisModule,
    PropertyModules,
    FileUploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
