import { Injectable } from '@nestjs/common';
import { AmenitiesRepository } from '../repository/amenities.repository';
import { AmenitiesDto } from './amenities.dto';

@Injectable()
export class AmenitiesService {
  constructor(private readonly amenitiesRepository: AmenitiesRepository) {}

  async create(dto: AmenitiesDto) {
    return await this.amenitiesRepository.save(dto);
  }

  async getAmenities() {
    return await this.amenitiesRepository.find();
  }
}
