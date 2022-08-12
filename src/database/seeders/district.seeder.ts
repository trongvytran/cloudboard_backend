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
    const mockDistricts = [
      '1',
      '2',
      '12',
      'Go Vap',
      'Binh Thanh',
      'Binh Tan',
      'Tan Binh',
      'Tan Phu',
      'Phu Nhuan',
      'Thu Đuc',
      '3',
      '10',
      '11',
      '4',
      '5',
      '6',
      '8',
      '7',
      '9',
      'Cu Chi',
      'Hoc Mon',
      'Binh Chanh',
      'Nha Be',
      'Can Gio',
    ];
    const data = [];
    mockDistricts.forEach((district: string) => {
      data.push({ name: district, city: { id: 1, name: 'Ho Chi Minh' } });
    });
    if (district.length === 0) {
      await this.districtRepository.save(data);
    }
  }
}
