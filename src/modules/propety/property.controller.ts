import { UserReq } from 'src/common/decorators/user.decorator';
import { CreatePropertyDto } from './dto/property.dto';
import { PropertyService } from './property.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserJwtDto } from '../auth/dto/auth.dto';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('property')
@ApiTags('property')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() dto: CreatePropertyDto, @UserReq() userReq: UserJwtDto) {
    return await this.propertyService.create(dto, userReq.id);
  }
}
