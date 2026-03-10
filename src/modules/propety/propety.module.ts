import { Module } from '@nestjs/common';
import { PropertyRepository } from '../repository/property.repository';
import { TypeOrmExModule } from '../../common/typeorm/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([PropertyRepository])],
  controllers: [],
  providers: [],
})
export class PropertyModules {}
