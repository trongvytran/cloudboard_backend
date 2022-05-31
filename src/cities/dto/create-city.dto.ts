import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ example: 'Ho Chi Minh' })
  name: string;
}
