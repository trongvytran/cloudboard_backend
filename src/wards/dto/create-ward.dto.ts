import { ApiProperty } from '@nestjs/swagger';
import { District } from '../../districts/entities/district.entity';

export class CreateWardDto {
  @ApiProperty({ example: 'Da Kao' })
  name: string;

  @ApiProperty()
  district: District;
}
