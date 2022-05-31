import { Billboard } from '../../billboards/entities/billboard.entity';
import { District } from '../../districts/entities/district.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Billboard, (billboard) => billboard.city)
  billboards: Billboard[];

  @OneToMany(() => District, (district) => district.city)
  districts: District[];
}
