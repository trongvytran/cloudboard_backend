import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Billboard } from '../../billboards/entities/billboard.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { District } from '../../districts/entities/district.entity';
import { City } from '../../cities/entities/city.entity';
import { faker } from '@faker-js/faker';
@Injectable()
export class BillboardSeeder {
  constructor(
    @InjectRepository(Billboard)
    private billboardRepository: Repository<Billboard>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async run() {
    const user = await this.userRepository.findOneBy({ id: 1 });
    const city = await this.cityRepository.findOneBy({ name: 'Ho Chi Minh' });
    const subscription = await this.subscriptionRepository.findOneBy({ id: 1 });
    const districts = await this.districtRepository.find({});
    const duration = [3, 6, 12, 24, 36];
    const billboardData = [];
    for (let i = 0; i < 50; i++) {
      const districtRandom = Math.floor(Math.random() * districts.length);
      const durationRandom = Math.floor(Math.random() * duration.length);

      billboardData.push({
        lat: 10.780654236388157,
        long: 106.69928199981912,
        name: faker.commerce.productName(),
        description: faker.lorem.paragraphs(),
        height: faker.datatype.number({ min: 30, max: 60 }),
        width: faker.datatype.number({ min: 30, max: 60 }),
        address: faker.address.streetAddress(),
        price: '115,000,000₫ - 160,000,000₫',
        imageUrl: faker.image.abstract(640, 480, true),
        videoUrl:
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        duration: `${duration[durationRandom]} months`,
        expiredAt: new Date(),
        city: city,
        user: user,
        subscription: subscription,
        district: districts[districtRandom],
        ward: { id: 1, name: 'Da Kao' },
      });
    }
    await this.billboardRepository.insert(billboardData);
  }
}
