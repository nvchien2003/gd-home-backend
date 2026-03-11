import { Amenity } from '../../database/entities/amenity.entity';
import { CustomRepository } from '../../common/typeorm/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Amenity)
export class AmenitiesRepository extends Repository<Amenity> {}
