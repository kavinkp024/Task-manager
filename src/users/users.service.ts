import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserQueryDto } from './dto/user-query.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }


  //POST
  async create(createUserDto: CreateUserDto): Promise<Users> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    (createUserDto.password = hashedPassword)
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }


  //Get
  async getManyAndCount(query: UserQueryDto): Promise<{ data: Users[]; total: number, page: number, limit: number }> {
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const skip = (page - 1) * limit;
    const queryBuilder = this.usersRepository
      .createQueryBuilder('users')
    try {
      if (query.name) {
        queryBuilder.andWhere('users.name = :name', { name: query.name });
      }
      if (query.phone) {
        queryBuilder.andWhere('users.phone = :phone', { phone: query.phone });
      }
      if (query.sortBy && query.sort_order) {
        queryBuilder.orderBy(`users.${query.sortBy}`, query.sort_order);
      } else {
        queryBuilder.orderBy('users.id', 'ASC');
      }
      queryBuilder.skip(skip).take(limit);
      const [data, total] = await queryBuilder.getManyAndCount();
      return { data, total, page, limit };
    } catch (error) {
      console.log("error -->", error)
      throw new BadRequestException("Unknown column error.");
    }
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
    const result = await this.usersRepository.findOneBy({ id });
    if (result) {
      await this.usersRepository.remove(result);
    } if (!result) {
      throw new BadRequestException('Bad Request', 'User Id is Invalid.');
    }
  }
}
