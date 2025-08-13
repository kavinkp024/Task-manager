import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500 })
  email: string;


  @CreateDateColumn()
  createdAt: Date;


  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}    
