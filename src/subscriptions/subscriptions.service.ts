import { BadRequestException , Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';
import StripeService from '../stripe/stripe.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    private readonly stripeService: StripeService,
  ) {}

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionRepository.save(createSubscriptionDto);
  }

  findAll() {
    return this.subscriptionRepository.find();
  }

  findOne(id: number) {
    return this.subscriptionRepository.findOneBy({ id });
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionRepository.update(id, updateSubscriptionDto);
  }

  remove(id: number) {
    return this.subscriptionRepository.delete(id);
  }

  public async createSubscription(customerId: string) {
    const priceId = process.env.SUBSCRIPTION_PRICE_ID;
 
    const subscriptions = await this.stripeService.listSubscriptions(priceId, customerId);
    if (subscriptions.data.length) {
      throw new BadRequestException('Customer already subscribed');
    }
    return this.stripeService.createSubscription(priceId, customerId);
  }
 
  public async getSubscription(customerId: string) {
    const priceId = process.env.SUBSCRIPTION_PRICE_ID;
    const subscriptions = await this.stripeService.listSubscriptions(priceId, customerId);
 
    if (!subscriptions.data.length) {
      return new NotFoundException('Customer not subscribed');
    }
    return subscriptions.data[0];
  }
}


