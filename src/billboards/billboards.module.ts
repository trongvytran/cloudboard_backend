import { Module } from '@nestjs/common';
import { BillboardsService } from './billboards.service';
import { BillboardsController } from './billboards.controller';

@Module({
  controllers: [BillboardsController],
  providers: [BillboardsService]
})
export class BillboardsModule {}
