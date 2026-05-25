import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  pricePerMonth: number;

  @Column({ type: 'simple-json', nullable: true })
  features: string[];
}
