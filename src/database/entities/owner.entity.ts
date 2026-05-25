import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity('owners')
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Property, (property) => property.owner)
  properties: Property[];

  @CreateDateColumn()
  createdOnDate: Date;

  @UpdateDateColumn()
  lastModifiedOnDate: Date;
}
