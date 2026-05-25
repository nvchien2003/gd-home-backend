import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../../database/entities/booking.entity';
import { Property } from '../../database/entities/property.entity';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { BookingEventsService } from './booking-events.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly events: BookingEventsService,
  ) {}

  async create(userId: string, dto: CreateBookingDto) {
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    if (startDate >= endDate) {
      throw new BadRequestException('endDate must be after startDate');
    }

    const property = await this.propertyRepository.findOne({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const overlap = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.propertyId = :propertyId', { propertyId: dto.propertyId })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: ['pending', 'confirmed'],
      })
      .andWhere('booking.startDate < :endDate AND booking.endDate > :startDate', {
        startDate,
        endDate,
      })
      .getOne();

    if (overlap) {
      throw new BadRequestException('Property is already booked for these dates');
    }

    const booking = await this.bookingRepository.save({
      user: { id: userId },
      property: { id: dto.propertyId },
      startDate,
      endDate,
      status: 'pending',
    });

    const result = await this.findOne(userId, booking.id);
    this.events.emit({ type: 'booking.created', booking: result });
    return result;
  }

  async findAll(userId: string) {
    const bookings = await this.bookingRepository.find({
      where: { user: { id: userId } },
      relations: ['property', 'property.owner'],
      order: { createdAt: 'DESC' },
    });

    return bookings.map((booking) => this.toResponse(booking));
  }

  async findOne(userId: string, id: string) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'property', 'property.owner'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.user.id !== userId) {
      throw new ForbiddenException('You do not have access to this booking');
    }

    return this.toResponse(booking);
  }

  async update(userId: string, id: string, dto: UpdateBookingDto) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'property', 'property.owner'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.user.id !== userId) {
      throw new ForbiddenException('You cannot update this booking');
    }

    booking.status = dto.status ?? booking.status;
    await this.bookingRepository.save(booking);
    const result = this.toResponse(booking);
    this.events.emit({ type: 'booking.updated', booking: result });
    return result;
  }

  stream() {
    return this.events.stream();
  }

  private toResponse(booking: Booking) {
    return {
      id: booking.id,
      propertyId: booking.property.id,
      startDate: booking.startDate,
      endDate: booking.endDate,
      status: booking.status,
      property: booking.property,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  }
}
