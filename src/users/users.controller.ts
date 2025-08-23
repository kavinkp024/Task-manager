import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, Query, HttpException, HttpStatus, ValidationPipe, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Users, user } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { userquerydto } from './dto/user.query.dto';
import { ApiTags, ApiBody, ApiBearerAuth, ApiResponse, ApiOperation, ApiOkResponse, ApiUnauthorizedResponse, ApiExtraModels } from '@nestjs/swagger';
import { UnauthorizedResponse } from './dto/unauth.response.dto';
import { successresponse } from './dto/success.response.dto';
import { Forbidden, ForbiddenId } from './dto/forbidden.response.dto';
import { NotFound } from './dto/not.found.response.dto';
import { badrequest } from './dto/bad.request.dto';
import { Internalservererror } from './dto/internal.server.error.dto';

@ApiTags('Users')
@Controller('users') 
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

 
  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: user })
  @ApiResponse({ status: 400, type: badrequest })
  @ApiResponse({ status: 500, type: Internalservererror })
  async create(
    @Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto): Promise<Users> {
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
  @ApiOperation({ summary: 'Get Users ' })
  @ApiResponse({ status: 200, type: successresponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: Internalservererror })
  @ApiBearerAuth('access-token')
  async findAll(
    @Query() query: userquerydto): Promise<{ data: Users[] }> {
    return this.usersService.getManyAndCount(query);
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: user })
  @ApiResponse({ status: 403, type: ForbiddenId })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiBearerAuth('access-token')
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
  @ApiOperation({ summary: 'user update' })
  @ApiResponse({ status: 200, type: user })
  @ApiResponse({ status: 404, type: NotFound })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiBearerAuth('access-token')
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
  @ApiOperation({ summary: 'user delete' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, type: Forbidden })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiBearerAuth('access-token')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number): Promise<void> {
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
