import { ApiProperty } from '@nestjs/swagger';

export class CreateWardDto {
  @ApiProperty({ example: 'Da Kao' })
  name: string;
}
