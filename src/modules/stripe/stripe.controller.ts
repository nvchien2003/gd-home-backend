// stripe.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @Post('create-payment-intent')
  async createPaymentIntent() {
    const paymentIntent = await this.stripeService.createPaymentIntent();
    return {
      message: 'Payment Intent created successfully',
      data: paymentIntent,
    }
  }
}
