import { Controller, Get } from '@nestjs/common';

@Controller('cron')
export class CronJobController {
  @Get('health')
  health() {
    return { status: 'ok' };
  }
}
