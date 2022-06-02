import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBillboardDto } from './dto/create-billboard.dto';
import { UpdateBillboardDto } from './dto/update-billboard.dto';
import { Billboard } from './entities/billboard.entity';

@Injectable()
export class BillboardsService {
  constructor(
    @InjectRepository(Billboard)
    private billboardRepository: Repository<Billboard>,
  ) {}

  create(createBillboardDto: CreateBillboardDto) {
    return this.billboardRepository.save(createBillboardDto);
  }

  findAll() {
    return this.billboardRepository.find();
  }

  findOne(id: number) {
    return this.billboardRepository.findOneBy({ id });
  }

  update(id: number, updateBillboardDto: UpdateBillboardDto) {
    return this.billboardRepository.update(id, updateBillboardDto);
  }

  remove(id: number) {
    return this.billboardRepository.delete(id);
  }
}
