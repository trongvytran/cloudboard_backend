import { Billboard } from '../../billboards/entities/billboard.entity';
import { Role } from '../../roles/entities/role.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  image_url: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column()
  create_by: string;

  @Column()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  modified_by: Date;

  @OneToMany(() => Billboard, (billboard) => billboard.user)
  billboards: Billboard[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
