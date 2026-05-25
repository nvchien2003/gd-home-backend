import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { RentalPostImage } from './rental-post-image.entity';

@Entity('rental_posts')
export class RentalPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_RENTAL_POSTS_USER_ID')
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Index('IDX_RENTAL_POSTS_LOCATION')
  @Column()
  location: string;

  @Index('IDX_RENTAL_POSTS_ROOM_TYPE')
  @Column()
  roomType: string;

  @Index('IDX_RENTAL_POSTS_PRICE_PER_MONTH')
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  pricePerMonth: number;

  @Column({ type: 'int', default: 1 })
  beds: number;

  @Column({ type: 'decimal', precision: 4, scale: 1, default: 1 })
  baths: number;

  @Column({ type: 'int', default: 0 })
  sqft: number;

  @Index('IDX_RENTAL_POSTS_STATUS')
  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => RentalPostImage, (image) => image.rentalPost, {
    cascade: true,
  })
  images: RentalPostImage[];

  @Index('IDX_RENTAL_POSTS_CREATED_AT')
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
