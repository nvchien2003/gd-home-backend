import { AbstractEntity } from '../../common/abstract/entity.abstract';

import { Entity, Column, OneToMany, Index } from 'typeorm';
import { Review } from './review.entity';
import { Medias } from './medias.entity';

@Entity('users')
export class User extends AbstractEntity {
  @Index({ unique: true })
  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  phone: string;

  @Index('IDX_USERS_LOCATION')
  @Column({ nullable: true })
  location: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  verify: boolean;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Medias, (medias) => medias.user)
  medias: Medias[];
}
