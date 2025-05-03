// src/app.module.ts

// --- Импорты ---
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToursModule } from './tours/tours.module';
import { BookingsModule } from './bookings/bookings.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';

// Импортируем ВСЕ классы сущностей
import { Tour } from './tours/entities/tour.entity';
import { Weekday } from './weekdays/entities/weekday.entity';
import { Feature } from './features/entities/feature.entity';
import { Booking } from './bookings/entities/booking.entity';
import { BookingStatus } from './bookings/entities/booking-status.entity';
import { ContactMethod } from './bookings/entities/contact-method.entity';
import { Category } from './categories/entities/category.entity';
import { Car } from './cars/entities/car.entity'; // <-- Убедитесь, что импорт есть
import { CarFeature } from './cars/entities/car-feature.entity'; // <-- Убедитесь, что импорт есть

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),

        // --- ИСПРАВЛЕНИЕ ЗДЕСЬ ---
        entities: [
            Tour,
            Weekday,
            Feature,
            Booking,
            BookingStatus,
            ContactMethod,
            Category,
            Car,          // <-- Добавили Car
            CarFeature    // <-- Добавили CarFeature
        ],
        // Или используйте авто-сканирование:
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // ------------------------

        synchronize: true,
        logging: true,
      }),
    }),
    // Остальные модули
    ToursModule,
    BookingsModule,
    CategoriesModule,
    AuthModule,
    CarsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}