import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { AbstractEntity } from '../../common/abstract/entity.abstract';
import { Amenity } from './amenity.entity';
import { PropertyImage } from './property-image.entity';
import { Review } from './review.entity';
import { User } from './user.entity';

export enum PropertyType {
  VILLA = 'villa',
  APARTMENT = 'apartment',
  HOUSE = 'house',
  CABIN = 'cabin',
  LOFT = 'loft',
}

@Entity('properties')
export class Property extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  pricePerMonth: number;

  @Column()
  beds: number;

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  baths: number;

  @Column()
  sqft: number;

  @Column({
    type: 'enum',
    enum: PropertyType,
  })
  type: PropertyType;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ default: 'USA' })
  country: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column({ default: 0 })
  totalReviews: number;

  @ManyToOne(() => User, (user) => user.properties, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => PropertyImage, (image) => image.property, {
    cascade: true,
  })
  images: PropertyImage[];

  @ManyToMany(() => Amenity, (amenity) => amenity.properties, {
    cascade: true,
  })
  @JoinTable({
    name: 'property_amenities',
  })
  amenities: Amenity[];

  @OneToMany(() => Review, (review) => review.property)
  reviews: Review[];
}
