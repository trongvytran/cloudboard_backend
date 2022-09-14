import { Billboard } from '../../billboards/entities/billboard.entity';
import { Role } from '../../roles/entities/role.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['email'])
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  stripeCustomerId: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ name: 'phone_number', default: '' })
  phoneNumber: string;

  @Column({ select: false, default: '' })
  password: string;

  @ApiProperty()
  @Column({ name: 'image_url' })
  imageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Billboard, (billboard) => billboard.user)
  billboards: Billboard[];

  @OneToMany(() => Billboard, (billboard) => billboard.user)
  bookedBillboards: Billboard[];

  @OneToOne(() => Subscription, (subscription) => subscription.user)
  @JoinColumn()
  subscription: Subscription;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
