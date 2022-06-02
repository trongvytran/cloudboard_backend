import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { Ward } from './entities/ward.entity';

@Injectable()
export class WardsService {
  constructor(
    @InjectRepository(Ward) private wardRepository: Repository<Ward>,
  ) {}

  create(createWardDto: CreateWardDto) {
    return this.wardRepository.save(createWardDto);
  }

  findAll() {
    return this.wardRepository.find();
  }

  findOne(id: number) {
    return this.wardRepository.findOneBy({ id });
  }

  update(id: number, updateWardDto: UpdateWardDto) {
    return this.wardRepository.update(id, updateWardDto);
  }

  remove(id: number) {
    return this.wardRepository.delete(id);
  }
}
