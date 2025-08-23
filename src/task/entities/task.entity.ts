import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../dto/status.enum';
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

  @Column({
    type: 'enum',
    enum: Status,
  })
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


export class tasksucess {
    @ApiProperty({ example: 'number' })
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    due_date: Date;

    @ApiProperty()
    priority: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    tags: string[];

    @ApiProperty({ example: 'number' })
    userId: string;

    @ApiProperty({ example: 'date' })
    created_at: Date;

    @ApiProperty({ example: 'date' })
    updated_at: Date;

}