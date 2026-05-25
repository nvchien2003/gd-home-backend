import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../../database/entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async me(userId: string) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { user: { id: userId } },
      relations: ['plan'],
      order: { createdAt: 'DESC' },
    });

    if (!subscription) {
      return {
        status: 'free',
        plan: null,
        currentPeriodEnd: null,
      };
    }

    return {
      id: subscription.id,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      plan: subscription.plan
        ? {
            id: subscription.plan.id,
            code: subscription.plan.code,
            name: subscription.plan.name,
            pricePerMonth: Number(subscription.plan.pricePerMonth),
            features: subscription.plan.features ?? [],
          }
        : null,
    };
  }
}
