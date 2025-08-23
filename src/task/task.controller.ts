import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, HttpException, HttpStatus, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks, tasksucess } from './entities/task.entity';
import { taskquerydto } from './dto/task-query.dto'
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiBody, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Forbidden } from '../swagger/forbidden';
import { badrequest } from '../swagger/bad.request';
import { taskresponse } from '../swagger/success.response.task';
import { Unauthorized } from '../swagger/unauth.response';
import { NotFound } from '../swagger/not-found';
import { servererror } from '../swagger/internal-serve-error';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}


    @Post()
    @ApiBody({ type: CreateTaskDto })
    @ApiOperation({ summary: 'Create Task' })
    @ApiResponse({ status: 201, type: tasksucess })
    @ApiResponse({ status: 400, type: badrequest })
    @ApiResponse({ status: 500, type: servererror })
    async create(
        @Body(new ValidationPipe()) createTaskDto: CreateTaskDto): Promise<Tasks> {
        try {
            return this.tasksService.create(createTaskDto);
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
    @ApiOperation({ summary: 'Get Tasks ' })
    @ApiResponse({ status: 200, type: taskresponse })
    @ApiResponse({ status: 401, type: Unauthorized })
    @ApiResponse({ status: 500, type: servererror })
    @ApiBearerAuth('access-token')
    async getManyAndCount(@Query() query: taskquerydto): Promise<{ data: Tasks[]; total: number }> {
        return this.tasksService.getManyAndCount(query);
    }


    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get Task by ID' })
    @ApiResponse({ status: 200, type: tasksucess })
    @ApiResponse({ status: 401, type: Unauthorized })
    @ApiBearerAuth('access-token')
    async findOneById(
        @Param('id', ParseIntPipe) id: number): Promise<Tasks> {
        try {
            const task = await this.tasksService.findOneById(id);
            if (!task) {
                throw new NotFoundException(`task with ID ${id} not found`);
            }
            return task;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'The expected ID is not find in database.',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }


    @Patch(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Task update' })
    @ApiResponse({ status: 200, type: tasksucess })
    @ApiResponse({ status: 404, type: NotFound })
    @ApiResponse({ status: 401, type: Unauthorized })
    @ApiBearerAuth('access-token')
    async patchTask(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        try {
            return this.tasksService.updateTask(id, updateTaskDto);
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
    @ApiOperation({ summary: 'Task delete' })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 403, type: Forbidden })
    @ApiResponse({ status: 401, type: Unauthorized })
    @ApiBearerAuth('access-token')
    async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        try {
            await this.tasksService.deleteTask(id);
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
