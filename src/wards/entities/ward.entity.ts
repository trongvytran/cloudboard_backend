import { Billboard } from '../../billboards/entities/billboard.entity';
import { District } from '../../districts/entities/district.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Unique,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['name'])
export class Ward {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  @Index()
  name: string;

  @OneToMany(() => Billboard, (billboard) => billboard.ward)
  billboards: Billboard[];

  @ManyToOne(() => District, (district) => district.wards, {
    onDelete: 'CASCADE',
  })
  district: District;
}
