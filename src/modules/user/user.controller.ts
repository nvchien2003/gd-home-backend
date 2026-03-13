import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateProfileDto } from './dto/user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { UserReq } from '../../common/decorators/user.decorator';
import { UserJwtDto } from '../auth/dto/auth.dto';

@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  profile(@Req() req) {
    return req.user;
  }

  @Put('update-profile')
  updateProfile(@UserReq() req: UserJwtDto, @Body() dto: UpdateProfileDto) {
    return this.userService.updateProfile(req.id, dto);
  }
}
