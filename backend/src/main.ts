// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // 1. Создаем экземпляр приложения NestJS
  const app = await NestFactory.create(AppModule);

  // 2. Получаем доступ к сервису конфигурации
  const configService = app.get(ConfigService);

  // 3. Получаем порт из переменных окружения (.env) или используем 3000 по умолчанию
  const port = configService.get<number>('PORT') || 3000;

  // 4. Применяем глобальный ValidationPipe для DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Удалять свойства, не описанные в DTO
      forbidNonWhitelisted: true, // Запрещать запросы с лишними свойствами
      transform: true,            // Автоматически преобразовывать типы
      transformOptions: {
        enableImplicitConversion: true, // Разрешить неявное преобразование (строка в число и т.д.)
      },
    }),
  );

  // 5. Настраиваем CORS для разрешения запросов с фронтенда
  app.enableCors({
    origin: 'http://localhost:5173', // Укажите порт вашего React-приложения
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Разрешить передачу cookie и заголовков авторизации
  });

  // 6. Запускаем приложение на указанном порту
  await app.listen(port);

  // 7. Выводим сообщение о том, что приложение успешно запущено
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// Запускаем асинхронную функцию bootstrap
bootstrap();