import { Module } from '@nestjs/common';
import { RentalPostsModule } from '../rental-posts/rental-posts.module';
import { RentalsController } from './rentals.controller';

@Module({
  imports: [RentalPostsModule],
  controllers: [RentalsController],
})
export class RentalsModule {}
