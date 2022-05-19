import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  price: number;

  @Column()
  amount: number;

  @Column()
  is_active: boolean;

  @Column()
  created_at: Date;

  @Column()
  create_by: string;

  @Column()
  modified_at: Date;

  @Column()
  modified_by: Date;
}
