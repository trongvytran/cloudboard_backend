import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import StripeError from './stripeError.enum';
@Injectable()
export default class StripeService {
  private stripe: Stripe;
 
  constructor(
    private configService: ConfigService
  ) {
    this.stripe = new Stripe(process.env.API_SECRET_KEY, {
        apiVersion: '2022-08-01',
      });
  }
 
  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email
    });
  }
  public async attachCreditCard(paymentMethodId: string, stripeCustomerId: string) {
    return this.stripe.setupIntents.create({
      confirm:true,
      customer: stripeCustomerId,
      payment_method: paymentMethodId,
    })
  }

  public async listCreditCards(customerId: string) {
    return this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
  }
  public async charge(amount: number, paymentMethodId: string, customerId: string) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: 'vnd',
      off_session: true,
      confirm: true
    })
  }

  public async setDefaultCreditCard(paymentMethodId: string, stripeCustomerId: string) {
    try {
      return await this.stripe.customers.update(stripeCustomerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      })
    } catch (error) {
      if (error?.type === StripeError.InvalidRequest) {
        throw new BadRequestException('Wrong credit card chosen');
      }
      throw new InternalServerErrorException();
    }
  }

  public async createSubscription(priceId: string, customerId: string,) {
    try {
      return await this.stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId
          }
        ]
      })
    } catch (error) {
      if (error?.code === StripeError.ResourceMissing) {
        throw new BadRequestException('Credit card not set up');
      }
      throw new InternalServerErrorException();
    }
  }
 
  public async listSubscriptions(priceId: string, customerId: string,) {
    return await this.stripe.subscriptions.list({
      customer: customerId,
      price: priceId,
  
    })
  }
  public async listAllSubscriptions( customerId: string,) {
    return await this.stripe.subscriptions.list({
      customer: customerId,
      status: "all"
  
    })
  }

  public async customerPortal(customerId: string,) {
    const portalSession = await this.stripe.billingPortal.sessions.create({
      customer: customerId,
 
    });
  
    return portalSession
  };
}