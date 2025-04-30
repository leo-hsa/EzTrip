import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    // 1. Модуль Конфигурации - загружает переменные из .env
    ConfigModule.forRoot({
      isGlobal: true, // Делаем ConfigModule глобальным, чтобы не импортировать его в каждом модуле
      envFilePath: '.env', // Указываем путь к файлу .env
    }),

    // 2. Модуль TypeORM - настраивает подключение к БД
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Импортируем ConfigModule, чтобы использовать ConfigService
      inject: [ConfigService], // Внедряем ConfigService для доступа к переменным окружения
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', // Тип базы данных
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Автоматически находить все файлы *.entity.ts/js
        synchronize: true, // ВАЖНО: true - автоматически создает/обновляет таблицы БД на основе entities (УДОБНО ДЛЯ РАЗРАБОТКИ, ОПАСНО ДЛЯ ПРОДАКШЕНА!)
        // В продакшене лучше использовать migrations, установите synchronize: false
        logging: false, // Можно установить в true для отладки SQL-запросов
      }),
    }),

    // 3. Подключаем другие модули приложения (пока пусто)
    // ToursModule, // Пример будущего модуля
  ],
  controllers: [AppController], // Базовый контроллер NestJS
  providers: [AppService],    // Базовый сервис NestJS
})
export class AppModule {}