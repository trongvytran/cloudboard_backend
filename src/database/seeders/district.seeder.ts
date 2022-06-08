import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from '../../districts/entities/district.entity';

@Injectable()
export class DistrictSeeder {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
  ) {}

  async run() {
    const district = await this.districtRepository.find();
    if (district.length === 0) {
      await this.districtRepository.save([
        { name: '1', city: { id: 1, name: 'Ho Chi Minh' } },
        { name: '2', city: { id: 1, name: 'Ho Chi Minh' } },
      ]);
    }
  }
}
