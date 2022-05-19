import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  product_id: string;

  @Column()
  trans_id: string;

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
}
