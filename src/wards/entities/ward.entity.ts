import { Billboard } from '../../billboards/entities/billboard.entity';
import { District } from '../../districts/entities/district.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Billboard, (billboard) => billboard.ward)
  billboards: Billboard[];

  @ManyToOne(() => District, (district) => district.wards)
  district: District;
}
