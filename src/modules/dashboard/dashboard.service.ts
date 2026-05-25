import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../../database/entities/booking.entity';
import { Favorite } from '../../database/entities/favorite.entity';
import { Property } from '../../database/entities/property.entity';
import { RentalPost } from '../../database/entities/rental-post.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(RentalPost)
    private readonly rentalPostRepository: Repository<RentalPost>,
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async overview(userId: string) {
    const [properties, rentalPosts, favorites, bookings, pendingBookings] =
      await Promise.all([
        this.propertyRepository.count(),
        this.rentalPostRepository.count({ where: { user: { id: userId } } }),
        this.favoriteRepository.count({ where: { user: { id: userId } } }),
        this.bookingRepository.count({ where: { user: { id: userId } } }),
        this.bookingRepository.count({
          where: { user: { id: userId }, status: 'pending' },
        }),
      ]);

    return {
      properties,
      rentalPosts,
      favorites,
      bookings,
      pendingBookings,
    };
  }
}
