// src/weekdays/entities/weekday.entity.ts
import { Tour } from '../../tours/entities/tour.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('weekdays')
export class Weekday {
  @PrimaryGeneratedColumn({ type: 'smallint' }) // smallint достаточно для 7 дней
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  name: string; // "Понедельник"

  @Column({ type: 'varchar', length: 3, unique: true })
  shortName: string; // "Пн"

  // Отношение многие-ко-многим к Турам (необязательно для чтения, но может быть полезно)
  // TypeORM сам создаст связующую таблицу, если не указать @JoinTable здесь
  // Но мы определим @JoinTable в Tour Entity, там это логичнее
  @ManyToMany(() => Tour, (tour) => tour.operationDays)
  tours: Tour[];
}