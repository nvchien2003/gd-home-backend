import { Otp } from '../../database/entities/otp.entity';
import { CustomRepository } from '../../common/typeorm/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Otp)
export class OtpRepository extends Repository<Otp> {}
