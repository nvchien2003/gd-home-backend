import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from '../../database/entities/favorite.entity';
import { Property } from '../../database/entities/property.entity';
import { AuthModule } from '../auth/auth.module';
import { PropertyModules } from '../propety/propety.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite, Property]),
    AuthModule,
    PropertyModules,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
