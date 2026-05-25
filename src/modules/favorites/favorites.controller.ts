import { Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserReq } from '../../common/decorators/user.decorator';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { UserJwtDto } from '../auth/dto/auth.dto';
import { FavoritesService } from './favorites.service';

@ApiTags('favorites')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(@UserReq() user: UserJwtDto) {
    return this.favoritesService.findAll(user.id);
  }

  @Post(':propertyId')
  toggle(
    @UserReq() user: UserJwtDto,
    @Param('propertyId', ParseIntPipe) propertyId: number,
  ) {
    return this.favoritesService.toggle(user.id, propertyId);
  }
}
