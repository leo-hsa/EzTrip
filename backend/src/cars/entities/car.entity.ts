// src/cars/entities/car.entity.ts
import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
    ManyToMany, JoinTable
  } from 'typeorm';
  import { TransmissionType, FuelType } from '../enums/car.enums'; // Импорт Enum'ов
  import { CarFeature } from './car-feature.entity'; // Импорт CarFeature
  
  @Entity('cars')
  export class Car {
    @PrimaryGeneratedColumn() // INT AUTO_INCREMENT
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    name: string; // "Volkswagen ID4"
  
    @Column({
      type: 'enum',
      enum: TransmissionType,
      // default: TransmissionType.AUTOMATIC // Можно задать значение по умолчанию
    })
    transmission: TransmissionType;
  
    @Column({
      type: 'enum',
      enum: FuelType,
    })
    fuelType: FuelType;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    dailyPrice: number;
  
    @Column({ type: 'varchar', length: 3, default: 'USD' })
    priceCurrency: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    bodyStyle?: string; // "SUV", "Кабриолет"
  
    @Column({ type: 'smallint', nullable: true })
    doors?: number; // 4, 5
  
    @Column({ type: 'smallint', nullable: true })
    passengers?: number; // 5
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    color?: string; // "Серебристый"
  
    @Column({ type: 'smallint', nullable: true })
    year?: number; // 2022
  
    @Column({ type: 'varchar', length: 100, nullable: true })
    engineDescription?: string; // "Electric", "1.5L Turbo"
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    imageUrl?: string;
  
    // Связь Многие-ко-Многим с Фичами
    @ManyToMany(() => CarFeature, { cascade: ['insert'], eager: true }) // eager: true - загружать фичи вместе с машиной
    @JoinTable({
      name: 'car_to_features', // Имя связующей таблицы
      joinColumn: { name: 'car_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'feature_id', referencedColumnName: 'id' },
    })
    features: CarFeature[]; // Массив фич машины
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }