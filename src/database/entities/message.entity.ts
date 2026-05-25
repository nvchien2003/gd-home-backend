import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_MESSAGES_CONVERSATION_ID')
  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    onDelete: 'CASCADE',
  })
  conversation: Conversation;

  @Index('IDX_MESSAGES_SENDER_ID')
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  sender: User;

  @Column('text')
  body: string;

  @Column({ nullable: true })
  readAt: Date;

  @Index('IDX_MESSAGES_CREATED_AT')
  @CreateDateColumn()
  createdAt: Date;
}
