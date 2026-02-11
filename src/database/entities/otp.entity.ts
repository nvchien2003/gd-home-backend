import { OtpType } from './../../common/constant/constant';
import { AbstractEntity } from '../../common/abstract/entity.abstract';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('otp')
export class Otp extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  code: string;

  @Column()
  type: OtpType;

  @Column()
  expiresAt: Date;
}
