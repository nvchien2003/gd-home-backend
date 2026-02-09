import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './database/data-source';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from './modules/stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSource),
    // AuthModule,
    UserModule,
    StripeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
