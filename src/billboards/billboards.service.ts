import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
    return this.billboardRepository.find({
      relations: ['district', 'city', 'ward', 'subscription', 'user'],
    });
  }

  search(value: string) {
    return this.billboardRepository.find({
      where: [
        {
          name: Like(`%${value}%`),
        },
        {
          address: Like(`%${value}%`),
        },
        {
          city: {
            name: Like(`%${value}%`),
          },
        },
        {
          district: {
            name: Like(`%${value}%`),
          },
        },
        {
          ward: {
            name: Like(`%${value}%`),
          },
        },
      ],
      relations: ['district', 'city', 'ward', 'subscription', 'user'],
    });
  }

  findOne(id: number) {
    return this.billboardRepository.findOne({
      where: { id: id },
      relations: ['district', 'city', 'ward', 'subscription', 'user'],
    });
  }

  update(id: number, updateBillboardDto: UpdateBillboardDto) {
    return this.billboardRepository.update(id, updateBillboardDto);
  }

  remove(id: number) {
    return this.billboardRepository.delete(id);
  }
}
