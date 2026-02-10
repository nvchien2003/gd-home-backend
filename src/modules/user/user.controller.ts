import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
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
}
