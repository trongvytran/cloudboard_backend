import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../../cities/entities/city.entity';

@Injectable()
export class CitySeeder {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}

  async run() {
    await this.cityRepository.insert([
      {
        name: 'Ho Chi Minh',
      },
    ]);
  }
}
