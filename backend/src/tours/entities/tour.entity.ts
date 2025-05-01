
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany, 
    JoinTable, 
    OneToMany,
    ManyToOne, 
    JoinColumn,
  } from 'typeorm';
  import { Booking } from '../../bookings/entities/booking.entity';
  import { Weekday } from '../../weekdays/entities/weekday.entity'; 
  import { Feature } from '../../features/entities/feature.entity'; 
  import { Category } from '../../categories/entities/category.entity';   
  
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

    @OneToMany(() => Booking, booking => booking.tour)
    bookings: Booking[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;


    @ManyToOne(() => Category, category => category.tours, {
      nullable: true, // Разрешить туру быть без категории? Решите сами.
      eager: true,    // Автоматически загружать категорию при запросе тура
      onDelete: 'SET NULL' // или 'RESTRICT' если тур не может быть без категории
 })
 @JoinColumn({ name: 'categoryId' }) 
 category?: Category; 

 @Column({ nullable: true }) 
 categoryId?: number;
  }