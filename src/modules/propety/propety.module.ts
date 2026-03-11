import { Module } from '@nestjs/common';
import { PropertyRepository } from '../repository/property.repository';
import { TypeOrmExModule } from '../../common/typeorm/typeorm-ex.module';
import { AuthModule } from '../auth/auth.module';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { AmenitiesRepository } from '../repository/amenities.repository';
import { MediasRepository } from '../repository/medias.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      PropertyRepository,
      AmenitiesRepository,
      MediasRepository,
    ]),
    AuthModule,
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModules {}
