import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });
    }
  }

  sendOtp(email: string, code: string) {
    if (process.env.NODE_ENV !== 'production') return;
    return this.transporter.sendMail({
      from: `"GD Home" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'OTP Code',
      html: `<h3>Your OTP: ${code}</h3><p>Expire in 5 minutes</p>`,
    });
  }
}
