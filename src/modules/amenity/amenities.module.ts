import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../../common/typeorm/typeorm-ex.module';
import { AmenitiesRepository } from '../repository/amenities.repository';
import { AmenitiesService } from './amenities.service';
import { AmenitiesController } from './amenities.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([AmenitiesRepository]),
    AuthModule,
  ],
  providers: [AmenitiesService],
  controllers: [AmenitiesController],
})
export class AmenitiesModule {}
