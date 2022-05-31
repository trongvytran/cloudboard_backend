import { Billboard } from '../../billboards/entities/billboard.entity';
import { City } from '../../cities/entities/city.entity';
import { Ward } from '../../wards/entities/ward.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Billboard, (billboard) => billboard.district)
  billboards: Billboard[];

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];

  @ManyToOne(() => City, (city) => city.districts)
  city: City;
}
