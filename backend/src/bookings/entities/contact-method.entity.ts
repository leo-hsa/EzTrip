// src/bookings/entities/contact-method.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { Booking } from './booking.entity';

@Entity('contact_methods')
export class ContactMethod {
  @PrimaryGeneratedColumn() // INT, AI
  id: number;


  @Column({ type: 'varchar', length: 100, unique: true })
  name: string; // 'WhatsApp', 'Звонок'

  @OneToMany(() => Booking, booking => booking.preferredContactMethod)
  bookings: Booking[];
}