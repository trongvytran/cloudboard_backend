import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ward } from '../../wards/entities/ward.entity';

@Injectable()
export class WardSeeder {
  constructor(
    @InjectRepository(Ward)
    private wardRepository: Repository<Ward>,
  ) {}

  async run() {
    const ward = await this.wardRepository.find();
    if (ward.length === 0) {
      await this.wardRepository.save([
        { name: 'Da Kao', district: { id: 1, name: '1' } },
        { name: 'Ben Thanh', district: { id: 1, name: '1' } },
      ]);
    }
  }
}
