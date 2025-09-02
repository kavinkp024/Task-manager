import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from './entities/task.entity';
import { TaskQuerydto } from './dto/task-query.dto'
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiBody, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { BadRequest } from '../swagger/bad.request';
import { TaskResponse } from '../swagger/success.response.task';
import { Unauthorized } from '../swagger/unauth.response';
import { NotFound } from '../swagger/not-found';
import { TaskList, TaskDelete, TaskCreate } from 'src/swagger/tasklist-response';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }


    @Post()
    @ApiBody({ type: CreateTaskDto })
    @ApiOperation({ summary: 'Add a new task for user' })
    @ApiResponse({ status: 201, type: TaskCreate })
    async create(
        @Body() createTaskDto: CreateTaskDto): Promise<{ message: string }> {
        try {
            await this.tasksService.create(createTaskDto);
            return { message: 'Task created succesfully.' };
        } catch (error) {
            throw new NotFoundException('Forign Key userId Invalid.');
        }
    }


    @Get()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Find tasks' })
    @ApiResponse({ status: 200, type: TaskResponse })
    @ApiResponse({ status: 401, type: Unauthorized })
    @ApiBearerAuth('access-token')
    async getManyAndCount(@Query() query: TaskQuerydto): Promise<{ data: Tasks[]; total: number }> {
        return this.tasksService.getManyAndCount(query);
    }


    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Find task by ID' })
    @ApiResponse({ status: 200, type: TaskList })
    @ApiResponse({ status: 401, type: Unauthorized })
    @ApiResponse({ status: 404, type: NotFound })
    @ApiBearerAuth('access-token')
    async findOneById(
        @Param('id', ParseIntPipe) id: number): Promise<Tasks> {
        const task = await this.tasksService.findOneById(id);
        if (!task) {
            throw new NotFoundException(`task with ID ${id} not found`);
        }
        return task;
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'update task by ID' })
    @ApiResponse({ status: 200, type: TaskList })
    @ApiResponse({ status: 404, type: NotFound })
    @ApiResponse({ status: 401, type: Unauthorized })
    @ApiBearerAuth('access-token')
    async patchTask(
        @Param('id') id: number,
        @Body() updateTaskDto: UpdateTaskDto,): Promise<Tasks> {
        return this.tasksService.updateTask(id, updateTaskDto);
    }


    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Delete completed task by ID' })
    @ApiResponse({ status: 200, type: TaskDelete })
    @ApiResponse({ status: 400, type: BadRequest })
    @ApiResponse({ status: 401, type: Unauthorized })
    @ApiBearerAuth('access-token')
    async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        await this.tasksService.deleteTask(id);
        return { message: 'Task deleted successfully.' };
    }
}
