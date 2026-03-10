import { CustomRepository } from '../../common/typeorm/typeorm-ex.decorator';
import { PropertyImage } from '../../database/entities/property-image.entity';
import { Repository } from 'typeorm';

@CustomRepository(PropertyImage)
export class PropertyImageRepository extends Repository<PropertyImage> {}
