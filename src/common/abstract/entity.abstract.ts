import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  createdOnDate: Date;
  @Column({ nullable: true })
  createdOnByUserId: string;
  @UpdateDateColumn()
  lastModifiedOnDate: Date;
  @Column({ nullable: true })
  lastModifiedByUserId: string;
  @DeleteDateColumn({ select: false })
  deleteAt: Date;
}
