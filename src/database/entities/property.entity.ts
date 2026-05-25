import {
  Entity,
  Column,
  CreateDateColumn,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Review } from './review.entity';
import { PropertyType } from '../../common/enum/enum';
import { Medias } from './medias.entity';
import { Owner } from './owner.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('IDX_PROPERTIES_TITLE')
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Index('IDX_PROPERTIES_PRICE')
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Index('IDX_PROPERTIES_PRICE_PER_MONTH')
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  pricePerMonth: number;

  @Column({ nullable: true })
  beds: number;

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  baths: number;

  @Column()
  sqft: number;

  @Index('IDX_PROPERTIES_TYPE')
  @Column({
    type: 'enum',
    enum: PropertyType,
  })
  type: PropertyType;

  @Index('IDX_PROPERTIES_LOCATION')
  @Column()
  location: string;

  @Column()
  image: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  reviewsCount: number;

  @Column({ type: 'simple-json', nullable: true })
  amenities: string[];

  @ManyToOne(() => Owner, (owner) => owner.properties, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;

  @OneToMany(() => Medias, (medias) => medias.property, {
    cascade: true,
  })
  medias: Medias[];

  @OneToMany(() => Review, (review) => review.property)
  reviews: Review[];

  @CreateDateColumn()
  createdOnDate: Date;

  @UpdateDateColumn()
  lastModifiedOnDate: Date;
}
