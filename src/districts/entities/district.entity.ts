import { Billboard } from '../../billboards/entities/billboard.entity';
import { City } from '../../cities/entities/city.entity';
import { Ward } from '../../wards/entities/ward.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['name'])
export class District {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany(() => Billboard, (billboard) => billboard.district)
  billboards: Billboard[];

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];

  @ManyToOne(() => City, (city) => city.districts)
  city: City;
}
