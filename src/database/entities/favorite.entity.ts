import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Property } from './property.entity';

@Entity('favorites')
@Unique('UQ_FAVORITES_USER_PROPERTY', ['user', 'property'])
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_FAVORITES_USER_ID')
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Index('IDX_FAVORITES_PROPERTY_ID')
  @ManyToOne(() => Property, { onDelete: 'CASCADE' })
  property: Property;

  @CreateDateColumn()
  createdAt: Date;
}
