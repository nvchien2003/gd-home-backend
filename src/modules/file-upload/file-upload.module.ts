import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../../common/typeorm/typeorm-ex.module';
import { MediasRepository } from '../repository/medias.repository';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([MediasRepository]),
    AuthModule,
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [],
})
export class FileUploadModule {}
