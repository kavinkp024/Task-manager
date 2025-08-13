import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 500 })
  due_date: string;

  @Column({ length: 500 })
  priority: string;

  @Column({ length: 500 })
  status: string;

  @Column({ length: 500 })
  tags: string;

  @Column({ length: 500 })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
