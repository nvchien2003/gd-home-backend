import { Module } from '@nestjs/common';
import { PropertyRepository } from '../repository/property.repository';
import { TypeOrmExModule } from '../../common/typeorm/typeorm-ex.module';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { OwnerRepository } from '../repository/owner.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PropertyRepository, OwnerRepository]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModules {}
