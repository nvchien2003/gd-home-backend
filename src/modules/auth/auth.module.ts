import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { OtpModule } from '../otp/otp.module';
import { AuthorizationGuard } from './authorization.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret123',
      signOptions: { expiresIn: '7d' },
    }),
    MailModule,
    OtpModule,
  ],
  providers: [AuthService, JwtStrategy, AuthorizationGuard],
  exports: [AuthorizationGuard, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
