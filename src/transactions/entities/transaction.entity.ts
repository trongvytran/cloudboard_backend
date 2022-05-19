import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subscription_id: number;

  @Column()
  amount: number;

  @Column()
  create_date: Date;

  @Column()
  is_success: boolean;
}
