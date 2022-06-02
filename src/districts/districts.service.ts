import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entities/district.entity';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
  ) {}

  create(createDistrictDto: CreateDistrictDto) {
    return this.districtRepository.save(createDistrictDto);
  }

  findAll() {
    return this.districtRepository.find();
  }

  findOne(id: number) {
    return this.districtRepository.findOneBy({ id });
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return this.districtRepository.update(id, updateDistrictDto);
  }

  remove(id: number) {
    return this.districtRepository.delete(id);
  }
}
