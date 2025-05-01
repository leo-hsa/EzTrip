// src/auth/strategies/http.strategy.ts
import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config'; // Для чтения из .env

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy, 'basic') { // Регистрируем стратегию с именем 'basic'
  constructor(private configService: ConfigService) {
    super({
        // Можно добавить realm для Basic Auth диалога в браузере, но для API не обязательно
        // realm: 'Admin Area',
    });
  }

  // Этот метод будет вызван Passport'ом, когда придет запрос с Basic Auth заголовком
  async validate(username?: string, password?: string): Promise<any> {
    const adminUsername = this.configService.get<string>('ADMIN_USERNAME');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    // Простая проверка статических кредов
    if (adminUsername === username && adminPassword === password) {
      // Возвращаем объект пользователя (или просто признак успеха)
      // Этот объект будет доступен в request.user
      return { username: adminUsername, isAdmin: true }; // Возвращаем что-то, чтобы показать успех
    }
    // Если проверка не прошла, выбрасываем исключение
    throw new UnauthorizedException('Invalid admin credentials');
  }
}