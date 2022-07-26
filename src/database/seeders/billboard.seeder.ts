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
        lat: 10.780654236388157,
        long: 106.69928199981912,
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
        lat: 10.788348211833336, 
        long: 106.69555990928687,
        name: 'Minh Pham',
        description:
          'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
        height: 14,
        width: 48,
        address: '123 Mac Đinh Chi, St.',
        price: '90,000,000₫ - 100,000,000₫',
        imageUrl: 'https://i.picsum.photos/id/49/200/300.jpg?hmac=mC_cJaZJfrb4JZcnITvz0OOwLCyOTLC0QXH4vTo9syY',
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
        lat: 10.780674163472378,
        long: 106.70053997064987,
        name: 'An Le',
        description:
          'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
        height: 14,
        width: 48,
        address: '123 Hai Ba Trung St.',
        price: '200,000,000₫ - 360,000,000₫',
        imageUrl: 'https://i.picsum.photos/id/182/200/300.jpg?hmac=W6MnOpe7fP0LlNAyWl6rzWbjyLOM3ix2TXRcFx7vEPE',
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
    ]
    );
  }
}
