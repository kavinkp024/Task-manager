import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, CreateDateColumn,OneToMany, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tasks } from 'src/task/entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @OneToMany(() => Tasks, task => task.user)
  tasks: Tasks;

}    


