import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RentalPost } from './rental-post.entity';

@Entity('rental_post_images')
export class RentalPostImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_RENTAL_POST_IMAGES_POST_ID')
  @ManyToOne(() => RentalPost, (rentalPost) => rentalPost.images, {
    onDelete: 'CASCADE',
  })
  rentalPost: RentalPost;

  @Column()
  url: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;
}
