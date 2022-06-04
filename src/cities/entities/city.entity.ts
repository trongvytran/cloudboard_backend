import { Billboard } from '../../billboards/entities/billboard.entity';
import { District } from '../../districts/entities/district.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['name'])
export class City {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany(() => Billboard, (billboard) => billboard.city)
  billboards: Billboard[];

  @OneToMany(() => District, (district) => district.city)
  districts: District[];
}
