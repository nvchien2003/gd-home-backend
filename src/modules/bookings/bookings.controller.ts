import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UserReq } from '../../common/decorators/user.decorator';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { UserJwtDto } from '../auth/dto/auth.dto';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';

@ApiTags('bookings')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@UserReq() user: UserJwtDto, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(user.id, dto);
  }

  @Get()
  findAll(@UserReq() user: UserJwtDto) {
    return this.bookingsService.findAll(user.id);
  }

  @Sse('events')
  events(): Observable<MessageEvent> {
    return this.bookingsService.stream();
  }

  @Get(':id')
  findOne(@UserReq() user: UserJwtDto, @Param('id') id: string) {
    return this.bookingsService.findOne(user.id, id);
  }

  @Put(':id')
  update(
    @UserReq() user: UserJwtDto,
    @Param('id') id: string,
    @Body() dto: UpdateBookingDto,
  ) {
    return this.bookingsService.update(user.id, id, dto);
  }

}
