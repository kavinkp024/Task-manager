import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, Query,ValidationPipe, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Users } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { UserQueryDto } from './dto/user-query.dto';
import { ApiTags, ApiBody, ApiBearerAuth, ApiResponse, ApiOperation} from '@nestjs/swagger';
import { Unauthorized } from '../swagger/unauth.response';
import { Forbidden } from '../swagger/forbidden';
import { NotFound } from '../swagger/notfound';
import { BadRequest } from '../swagger/bad.request';
import { Internalservererror } from '../swagger/internal-server-error';
import { UsersResponse } from '../swagger/succes-response-user';
import { UserList } from '../swagger/userlist-response';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: UserList })
  @ApiResponse({ status: 400, type: BadRequest })
  @ApiResponse({ status: 500, type: Internalservererror })
  async create(
    @Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.create(createUserDto);
  }


  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Users ' })
  @ApiResponse({ status: 200, type: UsersResponse })
  @ApiResponse({ status: 401, type: Unauthorized })
  @ApiResponse({ status: 500, type: Internalservererror })
  @ApiBearerAuth('access-token')
  async findAll(
    @Query() query: UserQueryDto): Promise<{ data: Users[] }> {
    return this.usersService.getManyAndCount(query);
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: UserList })
  @ApiResponse({ status: 401, type: Unauthorized })
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
  @ApiOperation({ summary: 'user update' })
  @ApiResponse({ status: 200, type: UserList })
  @ApiResponse({ status: 404, type: NotFound })
  @ApiResponse({ status: 401, type: Unauthorized })
  @ApiBearerAuth('access-token')
  async patchUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
      
  }


  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'user delete' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, type: Forbidden })
  @ApiResponse({ status: 401, type: Unauthorized })
  @ApiBearerAuth('access-token')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
