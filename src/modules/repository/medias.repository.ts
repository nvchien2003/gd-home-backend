import { CustomRepository } from '../../common/typeorm/typeorm-ex.decorator';
import { Medias } from '../../database/entities/medias.entity';
import { Repository } from 'typeorm';

@CustomRepository(Medias)
export class MediasRepository extends Repository<Medias> {}
