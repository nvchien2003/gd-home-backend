import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class CronJobService {
  @Cron('30 * * * * *')
  async handleCron() {
    try {
      if (process.env.NODE_ENV === 'development') return;
      await axios.get('http://localhost:4000/cron/health');
      console.log('call second is 45');
    } catch (err) {
      console.log('failed', err);
    }
  }
}
