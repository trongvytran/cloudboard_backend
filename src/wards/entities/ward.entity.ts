import { Billboard } from 'src/billboards/entities/billboard.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Billboard, (billboard) => billboard.ward)
  billboards: Billboard[];
}
