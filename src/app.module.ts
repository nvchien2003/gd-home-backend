import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './config/redis/redis.module';
import { CommonModule } from './common/common.module';
import { PropertyModules } from './modules/propety/propety.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { AmenitiesModule } from './modules/amenity/amenities.module';
import { CronJobModule } from './modules/cronjob/cronjob.module';
import { RentalPostsModule } from './modules/rental-posts/rental-posts.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { RentalsModule } from './modules/rentals/rentals.module';
import { ChatModule } from './modules/chat/chat.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UserModule,
    RedisModule,
    PropertyModules,
    FileUploadModule,
    AmenitiesModule,
    CronJobModule,
    RentalPostsModule,
    FavoritesModule,
    BookingsModule,
    DashboardModule,
    RentalsModule,
    ChatModule,
    SubscriptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
