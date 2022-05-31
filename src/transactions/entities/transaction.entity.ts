import { Subscription } from '../../subscriptions/entities/subscription.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Subscription)
  @JoinColumn()
  subscription: Subscription;

  @Column()
  amount: number;

  @Column()
  create_date: Date;

  @Column()
  is_success: boolean;
}
