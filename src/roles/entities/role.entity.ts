import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
