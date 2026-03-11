import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AmenitiesService } from './amenities.service';
import { AmenitiesDto } from './amenities.dto';
import { AuthorizationGuard } from '../auth/authorization.guard';

@Controller('amenities')
@ApiTags('amenities')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Post()
  async createAmenities(@Body() dto: AmenitiesDto) {
    return await this.amenitiesService.create(dto);
  }

  @Get()
  async getAll() {
    return await this.amenitiesService.getAmenities();
  }
}
