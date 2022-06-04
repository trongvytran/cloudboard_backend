import { Billboard } from '../../billboards/entities/billboard.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @ManyToOne(() => Billboard, (billboard) => billboard.subscription)
  billboard: Billboard;

  @Column()
  period_start: Date;

  @Column()
  period_end: Date;

  @Column()
  cancel_at_period_end: boolean;

  @Column()
  cancelled_at: Date;

  @Column()
  cancelled_by: string;

  @Column()
  status: boolean;

  @OneToMany(() => Billboard, (billboard) => billboard.subscription)
  billboards: Billboard[];
}
