import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { subscriptionNameEnum } from '../../subscriptions/enums/subscriptionName.enum';
import { subscriptionStatusEnum } from '../../subscriptions/enums/subscriptionStatus.enum';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

@Injectable()
export class SubscriptionSeeder {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async run() {
    const subscription = await this.subscriptionRepository.find();
    const user = await this.userRepository.findOneBy({ id: 1 });
    const date = new Date();
    if (subscription.length === 0) {
      await this.subscriptionRepository.insert([
        {
          name: subscriptionNameEnum.plus,
          periodStart: new Date(),
          periodEnd: new Date(date.setMonth(date.getMonth() + 8)),
          status: subscriptionStatusEnum.active,
          user: user,
        },
      ]);
    }
  }
}
