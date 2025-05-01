// src/bookings/entities/booking-status.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { Booking } from './booking.entity';

@Entity('booking_statuses')
export class BookingStatus {
  @PrimaryGeneratedColumn() // INT, AI
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string; // 'new', 'processed'

  @Column({ type: 'varchar', length: 100 })
  name: string; // 'Новая заявка', 'Обработана'

  @OneToMany(() => Booking, booking => booking.status)
  bookings: Booking[];
}