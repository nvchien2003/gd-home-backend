import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RentalPostQueryDto } from '../rental-posts/dto/rental-post.dto';
import { RentalPostsService } from '../rental-posts/rental-posts.service';

@ApiTags('rentals')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalPostsService: RentalPostsService) {}

  @Get()
  findAll(@Query() query: RentalPostQueryDto) {
    return this.rentalPostsService.findAll({
      ...query,
      status: query.status ?? 'active',
    });
  }
}
