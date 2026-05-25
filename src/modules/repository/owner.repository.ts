import { Repository } from 'typeorm';
import { CustomRepository } from '../../common/typeorm/typeorm-ex.decorator';
import { Owner } from '../../database/entities/owner.entity';

@CustomRepository(Owner)
export class OwnerRepository extends Repository<Owner> {}
