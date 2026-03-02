import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { Property } from './property.entity';
import { AbstractEntity } from '../../common/abstract/entity.abstract';

@Entity('amenities')
export class Amenity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Property, (property) => property.amenities)
  properties: Property[];
}
