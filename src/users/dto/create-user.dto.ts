import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'Hoang An Le Ba' })
  name: string;

  @ApiProperty({ example: 'hoanganleba@gmail.com' })
  email: string;

  @ApiProperty({ example: '0909123456' })
  phoneNumber: string;

  @ApiProperty({ example: 'hoanganleba' })
  userName: string;

  @ApiProperty({ example: 'https://www.w3schools.com/howto/img_avatar.png' })
  imageUrl: string;

  role: Role;
}
