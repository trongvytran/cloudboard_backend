import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Billboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  city_id: string;

  @Column()
  district_id: string;

  @Column()
  ward_id: string;

  @Column()
  subscription_id: string;

  @Column()
  lat: number;

  @Column()
  long: number;

  @Column()
  name: string;

  @Column()
  detail_desc: string;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  full_location: string;

  @Column()
  price: number;

  @Column()
  imageURL: string;

  @Column()
  videoURL: string;

  @Column()
  is_active: boolean;

  @Column()
  approved_by: string;

  @Column()
  created_at: Date;

  @Column()
  create_by: string;

  @Column()
  modified_at: Date;

  @Column()
  modified_by: Date;
}
