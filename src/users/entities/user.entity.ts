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
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @ApiProperty()
  @Column({ name: 'user_name' })
  userName: string;

  @Column({ default: null })
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

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}