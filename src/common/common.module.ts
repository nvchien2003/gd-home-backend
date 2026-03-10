import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrimStringInterceptor } from './interceptors/trim.string';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppDataSource } from '../database/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TrimStringInterceptor,
    },
  ],
})
export class CommonModule {}
