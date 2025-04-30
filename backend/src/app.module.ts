// src/app.module.ts

// Добавьте эти строки:
import { AppController } from './app.controller'; // Импорт AppController
import { AppService } from './app.service';       // Импорт AppService
import { ToursModule } from './tours/tours.module'; // Импорт ToursModule

// --- Остальные существующие импорты ---
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './tours/entities/tour.entity';       // Эти импорты для TypeORM entities
import { Weekday } from './weekdays/entities/weekday.entity'; // могут остаться, если вы
import { Feature } from './features/entities/feature.entity'; // используете явное перечисление

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
        // Если вы вернули автоматическое сканирование:
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // Если используете явное перечисление:
        entities: [Tour, Weekday, Feature],
        synchronize: true,
        logging: true, // Оставим логирование включенным для отладки
      }),
    }),
    ToursModule, // Теперь TypeScript знает, что это такое
  ],
  controllers: [AppController], // И это тоже
  providers: [AppService],    // И это
})
export class AppModule {}