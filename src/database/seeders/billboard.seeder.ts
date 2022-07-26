import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Billboard } from '../../billboards/entities/billboard.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

@Injectable()
export class BillboardSeeder {
  constructor(
    @InjectRepository(Billboard)
    private billboardRepository: Repository<Billboard>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async run() {
    const user = await this.userRepository.findOneBy({ id: 1 });
    const subscription = await this.subscriptionRepository.findOneBy({ id: 1 });
    await this.billboardRepository.insert([
      {
        lat: 10.782619838216272,
        long: 106.70045961244851,
        name: 'Vy Tran',
        description:
          'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
        height: 14,
        width: 48,
        address: '123 Le Duan St.',
        price: '115,000,000₫ - 160,000,000₫',
        imageUrl: 'https://picsum.photos/id/11/200/300',
        videoUrl:
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        duration: '3 months',
        expiredAt: new Date(),
        city: { id: 1, name: 'Ho Chi Minh' },
        user: user,
        subscription: subscription,
        district: { id: 1, name: '1' },
        ward: { id: 1, name: 'Da Kao' },
      },

      {
        lat: -42.44713,
        long: -169.53328,
        name: 'Vy Tran',
        description:
          'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
        height: 14,
        width: 48,
        address: '123 Le Duan St.',
        price: '115,000,000₫ - 160,000,000₫',
        imageUrl: 'https://picsum.photos/id/11/200/300',
        videoUrl:
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        duration: '6 months',
        expiredAt: new Date(),
        city: { id: 1, name: 'Ho Chi Minh' },
        user: user,
        subscription: subscription,
        district: { id: 1, name: '1' },
        ward: { id: 1, name: 'Da Kao' },
      },

      {
        lat: -42.44713,
        long: -169.53328,
        name: 'Vy Tran',
        description:
          'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
        height: 14,
        width: 48,
        address: '123 Le Duan St.',
        price: '115,000,000₫ - 160,000,000₫',
        imageUrl: 'https://picsum.photos/id/11/200/300',
        videoUrl:
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        duration: '12 months',
        expiredAt: new Date(),
        city: { id: 1, name: 'Ho Chi Minh' },
        user: user,
        subscription: subscription,
        district: { id: 1, name: '1' },
        ward: { id: 1, name: 'Da Kao' },
      },
    ]);
  }
}
