import { AbstractEntity } from './../../common/abstract/entity.abstract';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { MEDIA_TYPE, STATUS } from '../../common/constant/constant';

@Entity('medias')
export class Medias extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ default: MEDIA_TYPE.IMAGE })
  type: number;

  @Column({ default: STATUS.ACTIVE })
  status: number;

  @ManyToOne(() => User, (user) => user.medias)
  user: User;

  @Column({ type: 'jsonb', nullable: true })
  attributes: any;
}
