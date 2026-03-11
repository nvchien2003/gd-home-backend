import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { OtpType } from '../../../common/enum/enum';

export class UserJwtDto {
  id: string;
}

export class LoginDto {
  @ApiProperty({ example: 'chien@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  @MinLength(8)
  password: string;
}

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName?: string;
}

/* ================= VERIFY OTP ================= */

export class VerifyOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(6, 6)
  code: string;

  @ApiProperty({ enum: OtpType, example: OtpType.VERIFY })
  @IsEnum(OtpType)
  type: OtpType;
}

/* ================= FORGOT ================= */

export class ForgotPasswordDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

/* ================= RESET ================= */

export class ResetPasswordDto {
  @ApiProperty()
  resetToken: string;

  @ApiProperty()
  @MinLength(8)
  newPass: string;

  @ApiProperty()
  @MinLength(8)
  confirmPass: string;
}
