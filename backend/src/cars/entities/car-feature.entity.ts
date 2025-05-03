// src/cars/entities/car-feature.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Index } from 'typeorm';
import { Car } from './car.entity';

@Entity('car_features')
export class CarFeature {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: 'varchar', length: 100, unique: true })
  name: string; // "Кондиционер"

  @Column({ type: 'varchar', length: 50, nullable: true })
  icon?: string;

  @ManyToMany(() => Car, car => car.features)
  // JoinTable определяется на стороне Car
  cars: Car[];
}