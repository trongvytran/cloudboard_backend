import { City } from 'src/cities/entities/city.entity';
import { District } from 'src/districts/entities/district.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { User } from 'src/users/entities/user.entity';
import { Ward } from 'src/wards/entities/ward.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Billboard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.billboards)
  user: User;

  @ManyToOne(() => City, (city) => city.billboards)
  city: City;

  @ManyToOne(() => District, (distinct) => distinct.billboards)
  district: District;

  @ManyToOne(() => Ward, (ward) => ward.billboards)
  ward: Ward;

  @ManyToOne(() => Subscription, (subscription) => subscription.billboards)
  subscription: Subscription;

  @Column()
  lat: number;

  @Column()
  long: number;

  @Column()
  name: string;

  @Column()
  detail_desc: string;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  full_location: string;

  @Column()
  price: number;

  @Column()
  imageURL: string;

  @Column()
  videoURL: string;

  @Column()
  is_active: boolean;

  @Column()
  approved_by: string;

  @Column()
  created_at: Date;

  @Column()
  create_by: string;

  @Column()
  modified_at: Date;

  @Column()
  modified_by: Date;
}
