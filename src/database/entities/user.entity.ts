import { AbstractEntity } from '../../common/abstract/entity.abstract';

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ default: false })
  isAdmin: boolean;
}
