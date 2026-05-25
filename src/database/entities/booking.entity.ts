import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Property } from './property.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_BOOKINGS_USER_ID')
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Index('IDX_BOOKINGS_PROPERTY_ID')
  @ManyToOne(() => Property, { onDelete: 'CASCADE' })
  property: Property;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Index('IDX_BOOKINGS_STATUS')
  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
