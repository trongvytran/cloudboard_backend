import { Injectable } from '@nestjs/common';
import { CreateBillboardDto } from './dto/create-billboard.dto';
import { UpdateBillboardDto } from './dto/update-billboard.dto';

@Injectable()
export class BillboardsService {
  create(createBillboardDto: CreateBillboardDto) {
    return 'This action adds a new billboard';
  }

  findAll() {
    return `This action returns all billboards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billboard`;
  }

  update(id: number, updateBillboardDto: UpdateBillboardDto) {
    return `This action updates a #${id} billboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} billboard`;
  }
}
