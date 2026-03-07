import { RedisService } from './../../config/redis/redis.service';

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  constructor(private readonly redisService: RedisService) {}

  private getKey(identifier: string): string {
    return `otp:${identifier}`;
  }

  async createOpt(identifier: string): Promise<string> {
    const client = this.redisService.getClient();
    const key = this.getKey(identifier);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await client.set(key, otp, 'EX', 5 * 60); // 5 minutes expiry
    return otp;
  }

  async verifyOtp(identifier: string, otp: string): Promise<boolean> {
    const client = this.redisService.getClient();
    const key = this.getKey(identifier);
    const storedOtp = await client.get(key);

    if (storedOtp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (storedOtp === otp) {
      await this.redisService.del(key); // OTP is single-use
      return true;
    }
  }
}
