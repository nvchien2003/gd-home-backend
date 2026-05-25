import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '../../database/entities/subscription.entity';
import { AuthModule } from '../auth/auth.module';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), AuthModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
