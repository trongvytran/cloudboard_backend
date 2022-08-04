import { ApiProperty } from '@nestjs/swagger';

export class GoogleTokenDto {
  @ApiProperty()
  accessToken: string;
}
