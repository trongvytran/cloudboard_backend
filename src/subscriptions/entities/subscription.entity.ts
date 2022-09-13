import { Billboard } from '../../billboards/entities/billboard.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { subscriptionStatusEnum } from '../enums/subscriptionStatus.enum';
import { subscriptionNameEnum } from '../enums/subscriptionName.enum';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.subscription, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  name: subscriptionNameEnum;

  @Column({ name: 'period_start' })
  periodStart: Date;

  @Column({ name: 'period_end' })
  periodEnd: Date;

  @Column({ name: 'is_cancel_at_period_end', default: false })
  isCancelAtPeriodEnd: boolean;

  @Column({ name: 'cancelled_at', default: null })
  cancelledAt: Date;

  @Column({ name: 'cancelled_by', default: null })
  cancelledBy: string;

  @Column()
  status: subscriptionStatusEnum;

  @OneToMany(() => Billboard, (billboard) => billboard.subscription)
  billboards: Billboard[];
}
