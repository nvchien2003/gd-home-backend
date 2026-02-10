import { User } from '../../database/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  /**
   * Create JWT access token
   */
  private generateAccessToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    return this.jwtService.sign(payload);
  }

  /**
   * Login
   */
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

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
      },
    };
  }
}
