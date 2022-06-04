import { ApiProperty } from '@nestjs/swagger';
import { City } from '../../cities/entities/city.entity';

export class CreateDistrictDto {
  @ApiProperty({ example: '1' })
  name: string;

  @ApiProperty()
  city: City;
}
