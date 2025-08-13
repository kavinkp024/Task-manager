import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, Query, HttpException, HttpStatus, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Users } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }


  @Post()
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<Users> {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error 
      });
    }
  }


  @Get()
  @UseGuards(AuthGuard)
  async getUsers(@Query('email') email?: string): Promise<Users | Users[]> {
    try {
      if (email) {
        const user = await this.usersService.findUserByEmail(email);
        if (user) {
          return user;
        }
      }
      return this.usersService.findAll();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }



  @Get(':id')
  @UseGuards(AuthGuard)
  async findOneById(
    @Param('id', ParseIntPipe) id: number): Promise<Users> {
    try {
      const user = await this.usersService.findOneById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'The expected user ID is not find in database.',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }


  @Patch(':id')
  @UseGuards(AuthGuard)
  async patchUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.usersService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message.',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }


  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.usersService.deleteUser(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }
}
