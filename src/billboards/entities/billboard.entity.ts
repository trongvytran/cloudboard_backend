import { City } from '../../cities/entities/city.entity';
import { District } from '../../districts/entities/district.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { User } from '../../users/entities/user.entity';
import { Ward } from '../../wards/entities/ward.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Billboard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.billboards)
  user: User;

  @ManyToOne(() => City, (city) => city.billboards)
  city: City;

  @ManyToOne(() => District, (district) => district.billboards)
  district: District;

  @ManyToOne(() => Ward, (ward) => ward.billboards)
  ward: Ward;

  @ManyToOne(() => Subscription, (subscription) => subscription.billboards)
  subscription: Subscription;

  @Column({ type: 'float', default: 0 })
  lat: number;

  @Column({ type: 'float', default: 0 })
  long: number;

  @Column()
  @Index()
  name: string;

  @Column()
  description: string;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  @Index()
  address: string;

  @ManyToOne(() => User, (user) => user.billboards, { onDelete: 'CASCADE' })
  like: User;

  @Column()
  duration: string;

  @Column()
  price: string;

  @Column({ default: 0 })
  view: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'video_url' })
  videoUrl: string;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @Column({ name: 'approved_by', default: null })
  approvedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'expired_at' })
  expiredAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
