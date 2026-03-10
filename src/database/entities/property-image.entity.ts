import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Property } from './property.entity';
import { AbstractEntity } from '../../common/abstract/entity.abstract';

@Entity('property_images')
export class PropertyImage extends AbstractEntity {
  @Column()
  imageUrl: string;

  @Column({ default: false })
  isThumbnail: boolean;

  @ManyToOne(() => Property, (property) => property.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property: Property;
}
