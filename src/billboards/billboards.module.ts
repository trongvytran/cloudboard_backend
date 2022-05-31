import { Module } from '@nestjs/common';
import { BillboardsService } from './billboards.service';
import { BillboardsController } from './billboards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billboard } from './entities/billboard.entity';
import { User } from '../users/entities/user.entity';
import { District } from '../districts/entities/district.entity';
import { Ward } from '../wards/entities/ward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billboard, User, District, Ward])],
  controllers: [BillboardsController],
  providers: [BillboardsService],
})
export class BillboardsModule {}
