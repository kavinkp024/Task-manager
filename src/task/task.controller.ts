import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, HttpException, HttpStatus, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from './entities/task.entity';
import { taskquerydto } from './dto/task.query.dto'
import { AuthGuard } from '../auth/auth.guard';


@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }


    @Post()
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
    async findAll(@Query() query: taskquerydto): Promise<Tasks[]> {
        return this.tasksService.findAll(query);
    }


    @Get('status')
    @UseGuards(AuthGuard)
    async getTasksCountBystatus() {
        return this.tasksService.getTasksCountBystatus();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findOneById(
        @Param('id', ParseIntPipe) id: number): Promise<Tasks> {
        try {
            const task = await this.tasksService.findOneById(id);
            if (!task) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return task;
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
