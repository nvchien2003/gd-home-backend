import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalPost } from '../../database/entities/rental-post.entity';
import { RentalPostImage } from '../../database/entities/rental-post-image.entity';
import { AuthModule } from '../auth/auth.module';
import { RentalPostsController } from './rental-posts.controller';
import { RentalPostsService } from './rental-posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([RentalPost, RentalPostImage]), AuthModule],
  controllers: [RentalPostsController],
  providers: [RentalPostsService],
  exports: [RentalPostsService],
})
export class RentalPostsModule {}
