
import { Tour } from '../../tours/entities/tour.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

 
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string; 

  @Column({ type: 'varchar', length: 150, unique: true })
  slug: string; 

  @OneToMany(() => Tour, tour => tour.category)
  tours: Tour[];
}