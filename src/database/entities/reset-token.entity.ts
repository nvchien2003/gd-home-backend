import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reset_tokens')
export class ResetToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_RESET_TOKENS_USER_ID')
  @Column()
  userId: string;

  @Index('IDX_RESET_TOKENS_TOKEN_HASH')
  @Column()
  tokenHash: string;

  @Column()
  expiresAt: Date;

  @Column({ nullable: true })
  usedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
