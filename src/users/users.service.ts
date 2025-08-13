import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

 
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }


  //POST
  async create(createUserDto: CreateUserDto): Promise<Users> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({ ...createUserDto, password: hashedPassword, });
    return this.usersRepository.save(newUser);
  }


  //GET ALL 
  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  //GET  EMAIL
  async findUserByEmail(email: string): Promise<Users | null | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // GET BY ID
  async findOneById(id: number): Promise<Users | null | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }



  //UPDATE
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }

  //REMOVE
  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
  }
}
