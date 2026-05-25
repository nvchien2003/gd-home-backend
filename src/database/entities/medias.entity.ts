import { AbstractEntity } from './../../common/abstract/entity.abstract';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { MEDIA_TYPE, STATUS } from '../../common/constant/constant';
import { Property } from './property.entity';

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

  @ManyToOne(() => Property, (property) => property.medias, { nullable: true })
  property: Property;

  @Column({ type: 'simple-json', nullable: true })
  attributes: any;
}
