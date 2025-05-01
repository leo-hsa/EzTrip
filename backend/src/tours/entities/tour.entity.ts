
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
    title: string; 
  
    @Column('text', { nullable: true }) 
    description: string;
  
    @Column({ length: 100 })
    location: string; 
  
    @Column({ type: 'varchar', length: 50 })
    durationText: string; 
  
    @Column('decimal', { precision: 10, scale: 2 })
    price: number; 
  
    @Column({ type: 'varchar', length: 3, default: 'USD' })
    priceCurrency: string; 
  
    @Column({ type: 'varchar', length: 50, default: 'per_person' }) 
    priceUnit: string; 
  
    @Column({ nullable: true, name: 'card_image_url' }) 
  cardImageUrl?: string;

  @Column({
    type: 'simple-json', 
    nullable: true,
  })
  galleryImageUrls?: string[]; 

  
    
    @ManyToMany(() => Weekday, { cascade: ['insert'] }) 
    @JoinTable({
      name: 'tour_operation_days', 
      joinColumn: { 
        name: 'tour_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: { 
        name: 'weekday_id',
        referencedColumnName: 'id',
      },
    })
    operationDays: Weekday[]; 
  

    
    
    @ManyToMany(() => Feature, { cascade: ['insert'] })
    @JoinTable({
      name: 'tour_features', 
      joinColumn: {
        name: 'tour_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'feature_id',
        referencedColumnName: 'id',
      },
    })
    features: Feature[]; 

    @OneToMany(() => Booking, booking => booking.tour)
    bookings: Booking[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;


    @ManyToOne(() => Category, category => category.tours, {
      nullable: true, 
      eager: true,    
      onDelete: 'SET NULL' 
 })
 @JoinColumn({ name: 'categoryId' }) 
 category?: Category; 

 @Column({ nullable: true }) 
 categoryId?: number;
  }