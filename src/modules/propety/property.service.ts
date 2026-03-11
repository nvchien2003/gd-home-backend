import { Injectable } from '@nestjs/common';
import { PropertyRepository } from '../repository/property.repository';
import { CreatePropertyDto } from './dto/property.dto';
import { In } from 'typeorm';
import { MediasRepository } from '../repository/medias.repository';
import { AmenitiesRepository } from '../repository/amenities.repository';

@Injectable()
export class PropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly mediaRepository: MediasRepository,
    private readonly amenitiesRepository: AmenitiesRepository,
  ) {}

  async create(dto: CreatePropertyDto, userId: string) {
    const [medias, amenities] = await Promise.all([
      dto.medias?.length
        ? this.mediaRepository.find({
            where: {
              id: In(dto.medias),
              user: { id: userId },
            },
          })
        : [],

      dto.amenities?.length
        ? this.amenitiesRepository.find({
            where: {
              id: In(dto.amenities),
            },
          })
        : [],
    ]);

    const property = this.propertyRepository.create({
      ...dto,
      owner: { id: userId },
      medias,
      amenities,
    });

    return this.propertyRepository.save(property);
  }
}
