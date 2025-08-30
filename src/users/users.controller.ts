import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service'; 
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Users } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { UserQueryDto } from './dto/user-query.dto';
import { ApiTags, ApiBody, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Unauthorized } from '../swagger/unauth.response';
import { NotFound } from '../swagger/not-found';
import { BadRequest } from '../swagger/bad.request';
import { UsersResponse } from '../swagger/succes-response-user';
import { UserList,UserCreate,UserDelete} from '../swagger/userlist-response';

@ApiTags('Users')
@Controller('users') 
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201,type:UserCreate })
  async create(
    @Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    await this.usersService.create(createUserDto);
    return { message: 'User created succesfully.' };
  }


  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Find user' })
  @ApiResponse({ status: 200, type: UsersResponse })
  @ApiResponse({ status: 401, type: Unauthorized })
  @ApiBearerAuth('access-token')
  async findAll(
    @Query() query: UserQueryDto): Promise<{ data: Users[] }> {
    const data = await this.usersService.getManyAndCount(query);
    return data;
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Find user by ID' })
  @ApiResponse({ status: 200, type: UserList })
  @ApiResponse({ status: 401, type: Unauthorized })
  @ApiResponse({ status: 404, type: NotFound })
  @ApiBearerAuth('access-token')
  async findOneById(
    @Param('id', ParseIntPipe) id: number): Promise<Users> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }


  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: UserList })
  @ApiResponse({ status: 404, type: NotFound })
  @ApiResponse({ status: 401, type: Unauthorized })
  @ApiBearerAuth('access-token')
  async patchUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto): Promise<Users> {
    return this.usersService.updateUser(id, updateUserDto);
  }


  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200,type:UserDelete })
  @ApiResponse({ status: 400, type: BadRequest })
  @ApiResponse({ status: 401, type: Unauthorized })
  @ApiBearerAuth('access-token')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number): Promise<{message:string}> {
    await this.usersService.deleteUser(id);
    return {message:'User deleted successfully.'}
  }
}
