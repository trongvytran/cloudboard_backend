import { Billboard } from 'src/billboards/entities/billboard.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
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

  @ManyToOne(() => Product, (product) => product.subscriptions)
  product: Product;

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
