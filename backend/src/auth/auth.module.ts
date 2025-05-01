// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config'; // Импортируем ConfigModule
import { HttpStrategy } from './strategies/http.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic' }), // Можно указать стратегию по умолчанию
    ConfigModule, // Импортируем, чтобы HttpStrategy могла использовать ConfigService
  ],
  providers: [
    HttpStrategy, // Регистрируем нашу стратегию
    // AuthService, LocalStrategy, JwtStrategy здесь не нужны для Basic Auth
  ],
  exports: [PassportModule], // Экспортируем PassportModule, если он нужен в других модулях
})
export class AuthModule {}