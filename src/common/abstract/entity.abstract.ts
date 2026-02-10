import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
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
