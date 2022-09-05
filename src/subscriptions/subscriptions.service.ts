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

  public async createSubscription(stripeCustomerId: string) {
    const priceId = process.env.SUBSCRIPTION_PRICE_ID;
    const customerId = "cus_MLom7df9sRBBTG"
    
    const subscriptions = await this.stripeService.listSubscriptions(priceId, stripeCustomerId);
    if (subscriptions.data.length) {
      throw new BadRequestException('Customer already subscribed');
    }
    return this.stripeService.createSubscription(priceId, stripeCustomerId);
  }
 
  public async getSubscription(stripeCustomerId: string)
   {
    const subscriptions = await this.stripeService.listAllSubscriptions(stripeCustomerId);
    if (!subscriptions.data.length) {
      return new NotFoundException('Customer not subscribed');
    }
    return subscriptions;
  }

}


