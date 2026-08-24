import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  companyName!: string;

  @Column()
  website!: string;

  @Column()
  industry!: string;

  @Column()
  employeeCount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
