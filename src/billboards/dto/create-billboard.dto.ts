import { ApiProperty } from '@nestjs/swagger';
import { City } from '../../cities/entities/city.entity';

export class CreateBillboardDto {
  @ApiProperty()
  lat: number;

  @ApiProperty()
  long: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  detailDescription: string;

  @ApiProperty()
  height: number;

  @ApiProperty()
  width: number;

  @ApiProperty()
  fullLocation: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  view: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  videoUrl: string;

  @ApiProperty()
  approvedBy: string;

  @ApiProperty()
  expiredAt: Date;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  city: City;
}
