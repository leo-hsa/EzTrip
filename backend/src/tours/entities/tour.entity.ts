// src/tours/entities/tour.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany, // Импортируем ManyToMany
    JoinTable,  // Импортируем JoinTable
  } from 'typeorm';
  import { Weekday } from '../../weekdays/entities/weekday.entity'; // Импорт Weekday
  import { Feature } from '../../features/entities/feature.entity'; // Импорт Feature
  
  @Entity('tours')
  export class Tour {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 255 })
    title: string; // "Каппадокия «премиум»"
  
    @Column('text', { nullable: true }) // Описание может быть необязательным на карточке
    description: string;
  
    @Column({ length: 100 })
    location: string; // "Каппадокия"
  
    @Column({ type: 'varchar', length: 50 })
    durationText: string; // "2 дня"
  
    @Column('decimal', { precision: 10, scale: 2 })
    price: number; // 115.00
  
    @Column({ type: 'varchar', length: 3, default: 'USD' })
    priceCurrency: string; // "USD"
  
    @Column({ type: 'varchar', length: 50, default: 'per_person' }) // 'per_person' или 'per_group'
    priceUnit: string; // "с человека" -> per_person
  
    @Column({ nullable: true })
    imageUrl?: string;
  
    // Связь Многие-ко-Многим с Днями Недели
    @ManyToMany(() => Weekday, { cascade: ['insert'] }) // cascade: ['insert'] может быть полезен при создании
    @JoinTable({
      name: 'tour_operation_days', // Имя связующей таблицы
      joinColumn: { // Колонка в связующей таблице, ссылающаяся на Tour
        name: 'tour_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: { // Колонка в связующей таблице, ссылающаяся на Weekday
        name: 'weekday_id',
        referencedColumnName: 'id',
      },
    })
    operationDays: Weekday[]; // Массив дней, когда тур проводится
  
    // Связь Многие-ко-Многим с Услугами
    @ManyToMany(() => Feature, { cascade: ['insert'] })
    @JoinTable({
      name: 'tour_features', // Имя связующей таблицы
      joinColumn: {
        name: 'tour_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'feature_id',
        referencedColumnName: 'id',
      },
    })
    features: Feature[]; // Массив включенных услуг
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }