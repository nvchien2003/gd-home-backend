import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SignUpDto,
  UserJwtDto,
  VerifyOtpDto,
} from './dto/auth.dto';
import { UserReq } from '../../common/decorators/user.decorator';
import { AuthorizationGuard } from './authorization.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('verify')
  verify(@Body() dto: VerifyOtpDto) {
    console.log(dto);
    return this.authService.verifyOtp(dto);
  }

  @Post('forgot-password')
  forgot(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  reset(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Get('profile')
  @UseGuards(AuthorizationGuard)
  profile(@UserReq() userReq: UserJwtDto) {
    return this.authService.profile(userReq.id);
  }
}
