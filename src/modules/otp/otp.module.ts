import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../../common/typeorm/typeorm-ex.module';
import { OtpRepository } from '../repository/otp.repository';
import { OtpService } from './otp.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([OtpRepository])],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
