import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../../database/entities/favorite.entity';
import { Property } from '../../database/entities/property.entity';
import { PropertyService } from '../propety/property.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly propertyService: PropertyService,
  ) {}

  async findAll(userId: string) {
    const favorites = await this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['property', 'property.owner'],
      order: { createdAt: 'DESC' },
    });

    return favorites.map((favorite) => ({
      id: favorite.id,
      property: this.propertyService.toResponse(favorite.property),
      createdAt: favorite.createdAt,
    }));
  }

  async toggle(userId: string, propertyId: number) {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const existing = await this.favoriteRepository.findOne({
      where: { user: { id: userId }, property: { id: propertyId } },
      relations: ['property', 'property.owner'],
    });

    if (existing) {
      await this.favoriteRepository.delete(existing.id);
      return { propertyId, favorited: false };
    }

    const favorite = await this.favoriteRepository.save({
      user: { id: userId },
      property: { id: propertyId },
    });

    return { id: favorite.id, propertyId, favorited: true };
  }
}
