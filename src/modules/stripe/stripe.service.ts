
import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
    });
  }

  async createPaymentIntent() {
    const payment = await this.stripe.paymentIntents.create({
      amount: 100000,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      }
    });

    return {
      paymentIntentId: payment.id,
      clientSecret: payment.client_secret,
      status: payment.status,
    }
  }
}
