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

// Импортируем ВСЕ классы сущностей
import { Tour } from './tours/entities/tour.entity';
import { Weekday } from './weekdays/entities/weekday.entity';
import { Feature } from './features/entities/feature.entity';
import { Booking } from './bookings/entities/booking.entity';
import { BookingStatus } from './bookings/entities/booking-status.entity';
import { ContactMethod } from './bookings/entities/contact-method.entity';
import { Category } from './categories/entities/category.entity';




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
        // Перечисляем ВСЕ сущности
        entities: [
            Tour,
            Weekday,
            Feature,
            Booking,
            BookingStatus,
            ContactMethod,
            Category 
        ],
        // Или верните авто-сканирование, если уверены, что нет "лишних" .entity файлов
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // ------------------------

        synchronize: true,
        logging: true,
      }),
    }),
    ToursModule,
    BookingsModule,
    CategoriesModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}