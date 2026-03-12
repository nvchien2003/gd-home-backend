import { User } from '../../database/entities/user.entity';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SignUpDto,
  VerifyOtpDto,
} from './dto/auth.dto';
import { OtpType } from '../../common/enum/enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {}

  /**
   * Validate email + password
   */
  private async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    return user;
  }

  async signup(dto: SignUpDto) {
    console.log('to', dto);
    const user = await this.userService.create(dto);

    const otp = await this.otpService.createOpt(user.email);
    await this.mailService.sendOtp(user.email, otp);

    return {
      email: user.email,
      type: OtpType.VERIFY,
      message: 'Check email to verify',
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const otp = await this.otpService.verifyOtp(dto.email, dto.code);
    console.log('---------otp', dto.type);
    console.log('---------otp', OtpType.RESET);

    if (!otp) throw new BadRequestException('Invalid or expired OTP');

    // 👉 Verify account
    if (dto.type === OtpType.VERIFY) {
      await this.userService.verify(dto.email);
      return { message: 'Account verified' };
    }

    // 👉 Reset password
    if (dto.type === OtpType.RESET) {
      const resetToken = this.jwtService.sign(
        { email: dto.email, type: 'RESET' },
        { expiresIn: '10m' },
      );
      console.log('-----------------reset', resetToken);

      return { resetToken };
    }
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('Not found Email');
    }

    const otp = await this.otpService.createOpt(dto.email);
    await this.mailService.sendOtp(dto.email, otp);

    return {
      email: dto.email,
      type: OtpType.RESET,
      message: 'OTP sent',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { resetToken, newPass, confirmPass } = dto;

    if (newPass !== confirmPass) {
      throw new BadRequestException('Password confirmation does not match');
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(resetToken);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (payload.type !== 'RESET') {
      throw new UnauthorizedException('Invalid token');
    }

    await this.userService.updatePassword(payload.email, newPass);

    return { message: 'Password updated successfully' };
  }

  /**
   * Create JWT access token
   */
  private generateAccessToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    return this.jwtService.sign(payload);
  }

  /**
   * Login
   */
  async login(data: LoginDto) {
    const user = await this.validateUser(data.email, data.password);

    const accessToken = this.generateAccessToken(user);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        verify: user.verify,
      },
    };
  }
}
