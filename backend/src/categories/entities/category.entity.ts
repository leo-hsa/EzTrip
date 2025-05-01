// src/categories/entities/category.entity.ts
import { Tour } from '../../tours/entities/tour.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

 
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string; // 'Активные', 'Морские', 'Исторические'

  @Column({ type: 'varchar', length: 150, unique: true })
  slug: string; // 'active', 'sea', 'historical' (для URL и фильтрации)

  @OneToMany(() => Tour, tour => tour.category)
  tours: Tour[];
}