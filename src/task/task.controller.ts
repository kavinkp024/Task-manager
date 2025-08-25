import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, ServiceUnavailableException, ValidationPipe, UseGuards, Query, ConflictException } from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from './entities/task.entity';
import { TaskQuerydto } from './dto/task-query.dto'
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiBody, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Forbidden } from '../swagger/forbidden';
import { BadRequest } from '../swagger/bad.request';
import { TaskResponse } from '../swagger/success.response.task';
import { Unauthorized } from '../swagger/unauth.response';
import { NotFound } from '../swagger/notfound';
import { Internalservererror } from '../swagger/internal-server-error';
import { TaskList } from 'src/swagger/tasklist-response';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }


    @Post()
    @ApiBody({ type: CreateTaskDto })
    @ApiOperation({ summary: 'Create Task' })
    @ApiResponse({ status: 201, type: TaskList })
    @ApiResponse({ status: 400, type: BadRequest })
    @ApiResponse({ status: 500, type: Internalservererror })
    async create(
        @Body(ValidationPipe) createTaskDto: CreateTaskDto): Promise<Tasks> {
        try {
            return this.tasksService.create(createTaskDto);
        } catch (error) {
            throw new ConflictException('Task already created.')
        }
    }


    @Get()
    // @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get Tasks ' })
    @ApiResponse({ status: 200, type: TaskResponse })
    @ApiResponse({ status: 401, type: Unauthorized })
    @ApiResponse({ status: 500, type: Internalservererror })
    @ApiBearerAuth('access-token')
    async getManyAndCount(@Query() query: TaskQuerydto): Promise<{ data: Tasks[]; total: number }> {
        try {
            return this.tasksService.getManyAndCount(query);
        } catch (error) {
            throw new NotFoundException('The task table is empty.')
        }
    }


    @Get(':id')
    // @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get Task by ID' })
    @ApiResponse({ status: 200, type: TaskList })
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
            throw new ServiceUnavailableException('The server is unavilable.');
        }
    }


    @Patch(':id')
    // @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Task update' })
    @ApiResponse({ status: 200, type: TaskList })
    @ApiResponse({ status: 404, type: NotFound })
    @ApiResponse({ status: 401, type: Unauthorized })
    @ApiBearerAuth('access-token')
    async patchTask(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
    ) {
        try {
            return this.tasksService.updateTask(id, updateTaskDto);
        } catch (error) {
            throw new NotFoundException('Given Id is Invalid.');
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
            throw new NotFoundException('Given Id is Invalid.');
        }
    }
}
