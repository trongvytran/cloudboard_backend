import { Billboard } from '../../billboards/entities/billboard.entity';
import { District } from '../../districts/entities/district.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Ward {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany(() => Billboard, (billboard) => billboard.ward)
  billboards: Billboard[];

  @ManyToOne(() => District, (district) => district.wards)
  district: District;
}
