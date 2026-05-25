import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_CONVERSATIONS_USER_ID')
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Index('IDX_CONVERSATIONS_OWNER_ID')
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
