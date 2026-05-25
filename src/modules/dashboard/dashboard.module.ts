import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../../database/entities/booking.entity';
import { Favorite } from '../../database/entities/favorite.entity';
import { Property } from '../../database/entities/property.entity';
import { RentalPost } from '../../database/entities/rental-post.entity';
import { AuthModule } from '../auth/auth.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, RentalPost, Favorite, Booking]),
    AuthModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
