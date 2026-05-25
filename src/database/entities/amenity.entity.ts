import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common/abstract/entity.abstract';

@Entity('amenities')
export class Amenity extends AbstractEntity {
  @Column({ unique: true })
  name: string;
}
