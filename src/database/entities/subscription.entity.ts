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
import { Plan } from './plan.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_SUBSCRIPTIONS_USER_ID')
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Plan, { nullable: true })
  plan: Plan;

  @Index('IDX_SUBSCRIPTIONS_STATUS')
  @Column({ default: 'active' })
  status: string;

  @Column({ nullable: true })
  currentPeriodEnd: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
