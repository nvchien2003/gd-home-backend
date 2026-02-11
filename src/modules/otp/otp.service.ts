import { OtpRepository } from '../repository/otp.repository';
import { OtpType } from './../../common/constant/constant';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  constructor(private otpRepository: OtpRepository) {}

  async create(email: string, type: OtpType) {
    let code = Math.floor(100000 + Math.random() * 900000).toString();

    if (process.env.NODE_ENV !== 'production') {
      code = '123456';
    }

    await this.otpRepository.delete({ email, type });

    return this.otpRepository.save({
      email,
      code,
      type,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
  }

  async validate(email: string, code: string, type: OtpType) {
    const otp = await this.otpRepository.findOne({
      where: { email, code, type },
    });

    if (!otp) return null;
    if (otp.expiresAt < new Date()) return null;

    await this.otpRepository.delete({ id: otp.id });
    return otp;
  }
}
