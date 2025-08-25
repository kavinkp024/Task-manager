import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/users/entities/user.entity';


@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: "number" })
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column({ type: 'timestamp' })
  @ApiProperty()
  due_date: Date;

  @Column()
  @ApiProperty()
  priority: string;

  @Column()
  @ApiProperty()
  status: string;

  @Column('simple-array')
  @ApiProperty()
  tags: string[];

  @Column()
  @ApiProperty({ example: "number" })
  userId: number;

  @CreateDateColumn()
  @ApiProperty({ example: 'date' })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: 'date' })
  updated_at: Date;

  @ManyToOne(() => Users, user => user.tasks)
  @JoinColumn()
  user: Users[];

}


