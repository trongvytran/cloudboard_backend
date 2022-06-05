import { ApiProperty } from '@nestjs/swagger';
import { District } from '../../districts/entities/district.entity';
import { User } from '../../users/entities/user.entity';
import { Ward } from '../../wards/entities/ward.entity';
import { City } from '../../cities/entities/city.entity';

export class CreateBillboardDto {
  @ApiProperty({ example: -42.44713 })
  lat: number;

  @ApiProperty({ example: -169.53328 })
  long: number;

  @ApiProperty({ example: 'Vy Tran' })
  name: string;

  @ApiProperty({
    example:
      'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
  })
  description: string;

  @ApiProperty({ example: 14 })
  height: number;

  @ApiProperty({ example: 48 })
  width: number;

  @ApiProperty({ example: '123 Le Duan St.' })
  address: string;

  @ApiProperty({ example: '115,000,000₫ - 160,000,000₫' })
  price: string;

  @ApiProperty({ example: '6 months' })
  duration: string;

  @ApiProperty({ example: 'https://picsum.photos/id/11/200/300' })
  imageUrl: string;

  @ApiProperty({
    example:
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
  })
  videoUrl: string;

  @ApiProperty()
  expiredAt: Date;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  city: City;

  @ApiProperty()
  user: User;

  @ApiProperty()
  district: District;

  @ApiProperty()
  ward: Ward;
}
