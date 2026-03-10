import { Entity, Column, ManyToMany } from 'typeorm';

import { Property } from './property.entity';
import { AbstractEntity } from '../../common/abstract/entity.abstract';

@Entity('amenities')
export class Amenity extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Property, (property) => property.amenities)
  properties: Property[];
}
