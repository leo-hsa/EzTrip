// src/features/entities/feature.entity.ts
import { Tour } from '../../tours/entities/tour.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string; // "Трансфер от/до отеля"

  @Column({ type: 'varchar', length: 50, nullable: true })
  icon: string; // Класс иконки или URL

  // Отношение многие-ко-многим к Турам
  @ManyToMany(() => Tour, (tour) => tour.features)
  tours: Tour[];
}