// src/bookings/entities/booking.entity.ts
import { Tour } from '../../tours/entities/tour.entity';
import { BookingStatus } from './booking-status.entity'; // Импорт статуса
import { ContactMethod } from './contact-method.entity'; // Импорт способа связи
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn() // Используем автоинкрементный INT ID
  id: number;

  @ManyToOne(() => BookingStatus, status => status.bookings, { eager: true }) // eager: true - всегда загружать статус вместе с бронированием
  @JoinColumn({ name: 'booking_status_id' }) // Явно указываем имя колонки FK
  status: BookingStatus;

  @Column() // TypeORM сам создаст колонку booking_status_id типа INT
  booking_status_id: number;

  @ManyToOne(() => ContactMethod, method => method.bookings, { nullable: true, eager: true }) // Способ связи может быть не выбран
  @JoinColumn({ name: 'contact_method_id' })
  preferredContactMethod?: ContactMethod; // ? делает связь необязательной

  @Column({ nullable: true }) // Колонка contact_method_id тоже nullable
  contact_method_id?: number;

  @Column({ type: 'varchar', length: 255 })
  customerName: string;

  @Column({ type: 'varchar', length: 255 })
  customerEmail: string;

  @Column({ type: 'varchar', length: 50 })
  customerPhone: string;

  @Column({ type: 'text', nullable: true })
  customerNotes?: string;

  @Column({ type: 'boolean', default: false })
  agreedToPolicy: boolean;

  // Связь с туром (оставляем как есть, если Tour.id - UUID)
  @ManyToOne(() => Tour, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tourId' })
  tour?: Tour;

  @Column({ type: 'uuid', nullable: true })
  tourId?: string | null;

  @CreateDateColumn() // Автоматически управляется TypeORM
  createdAt: Date;

  @UpdateDateColumn() // Автоматически управляется TypeORM
  updatedAt: Date;
}