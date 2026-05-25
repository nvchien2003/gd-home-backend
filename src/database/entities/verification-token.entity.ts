import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('verification_tokens')
export class VerificationToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_VERIFICATION_TOKENS_EMAIL')
  @Column()
  email: string;

  @Column()
  codeHash: string;

  @Column()
  type: string;

  @Column()
  expiresAt: Date;

  @Column({ nullable: true })
  usedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
