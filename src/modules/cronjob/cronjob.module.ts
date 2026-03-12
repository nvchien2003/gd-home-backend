import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobController } from './cronjob.controller';
import { CronJobService } from './cronjob.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [CronJobController],
  providers: [CronJobService],
})
export class CronJobModule {}
