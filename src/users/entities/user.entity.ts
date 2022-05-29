import { Billboard } from 'src/billboards/entities/billboard.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  user_name: string;

  @Column()
  imageURL: string;

  @Column()
  type: string;

  @Column()
  created_at: Date;

  @Column()
  create_by: string;

  @Column()
  modified_at: Date;

  @Column()
  modified_by: Date;

  @OneToMany(() => Billboard, (billboard) => billboard.user)
  billboards: Billboard[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];
}
