// src/bookings/dto/create-booking.dto.ts
import {
    IsString, IsEmail, IsNotEmpty, IsOptional, IsUUID, IsBoolean, Equals, MinLength
  } from 'class-validator';
  
  export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    customerName: string;
  
    @IsEmail()
    customerEmail: string;
  
    @IsString()
    @IsNotEmpty()
    customerPhone: string;
  
    @IsUUID()
    @IsOptional()
    tourId?: string;
  
    @IsString() // Принимаем название способа связи как строку
    @IsOptional()
    preferredContactMethodName?: string; // Переименовали поле
  
    @IsString()
    @IsOptional()
    customerNotes?: string;
  
    @IsBoolean()
    @Equals(true, { message: 'You must agree to the policy' })
    agreedToPolicy: boolean;
  }