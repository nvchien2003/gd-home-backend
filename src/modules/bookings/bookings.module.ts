import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../../database/entities/booking.entity';
import { Property } from '../../database/entities/property.entity';
import { AuthModule } from '../auth/auth.module';
import { BookingEventsService } from './booking-events.service';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Property]), AuthModule],
  controllers: [BookingsController],
  providers: [BookingsService, BookingEventsService],
  exports: [BookingsService],
})
export class BookingsModule {}
