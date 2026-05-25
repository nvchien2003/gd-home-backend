import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RawResponse } from '../../common/decorators/raw-response.decorator';
import { UserReq } from '../../common/decorators/user.decorator';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { UserJwtDto } from '../auth/dto/auth.dto';
import {
  CreateRentalPostDto,
  RentalPostQueryDto,
  UpdateRentalPostDto,
} from './dto/rental-post.dto';
import { RentalPostsService } from './rental-posts.service';

@ApiTags('rental-posts')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
@Controller('rental-posts')
export class RentalPostsController {
  constructor(private readonly rentalPostsService: RentalPostsService) {}

  @Post()
  @RawResponse()
  create(@UserReq() user: UserJwtDto, @Body() dto: CreateRentalPostDto) {
    return this.rentalPostsService.create(user.id, dto);
  }

  @Get()
  findAll(@Query() query: RentalPostQueryDto) {
    return this.rentalPostsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalPostsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @UserReq() user: UserJwtDto,
    @Body() dto: UpdateRentalPostDto,
  ) {
    return this.rentalPostsService.update(id, user.id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UserReq() user: UserJwtDto) {
    return this.rentalPostsService.remove(id, user.id);
  }
}
