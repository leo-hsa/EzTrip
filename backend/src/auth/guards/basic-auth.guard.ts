// src/auth/guards/basic-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') { // Используем имя стратегии 'basic'
  // Здесь можно переопределить handleRequest для кастомной обработки ошибок,
  // но для начала достаточно базового функционала AuthGuard.
}