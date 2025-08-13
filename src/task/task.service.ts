import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from './entities/task.entity';
import { taskquerydto } from './dto/task.query.dto'


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,
    ) { }


    //POST
    async create(createTaskDto: CreateTaskDto): Promise<Tasks> {
        const newtask = this.tasksRepository.create({ ...createTaskDto });
        return this.tasksRepository.save(newtask);
    }

    // get many
    async findAll(query: taskquerydto): Promise<Tasks[]> {
        const queryBuilder = this.tasksRepository.createQueryBuilder('Tasks');

        if (query.title) {
            queryBuilder.andWhere('Tasks.title LIKE :title', { title: query.title });
        }
        if (query.status) {
            queryBuilder.andWhere('Tasks.status = :status', { status: query.status });
        }
        if (query.due_date) {
            queryBuilder.andWhere('Tasks.due_date = :due_date', { due_date: query.due_date });
        }
        if (query.priority) {
            queryBuilder.andWhere('Tasks.priority = :priority', { priority: query.priority });
        }
        if (query.tags) {
            queryBuilder.andWhere('Tasks.tags <= :tags', { tags: query.tags });
        }
        if (query.userId) {
            queryBuilder.andWhere('Tasks.userId <= :userId', { UserId: query.userId });
        }
        if (query.sortBy && query.sortOrder) {
            queryBuilder.orderBy(`Tasks.${query.sortBy}`, query.sortOrder);
        } else {
            queryBuilder.orderBy('Tasks.id', 'ASC');
        }
        return queryBuilder.getMany();
    }


    //GET GROUPING
    async getTasksCountBystatus(): Promise<any[]> {
        return this.tasksRepository
            .createQueryBuilder('Tasks')
            .select('Tasks.status', 'status')
            .addSelect('COUNT(Tasks.id)', 'TasksCount')
            .groupBy('Tasks.status')
            .orderBy('TasksCount', 'DESC')
            .getRawMany();
    }

    // GET BY ID
    async findOneById(id: number): Promise<Tasks | null | undefined> {
        return this.tasksRepository.findOne({ where: { id } });
    }



    //UPDATE
    async updateTask(id: number, updatetaskDto: UpdateTaskDto): Promise<Tasks> {
        const task = await this.tasksRepository.findOneBy({ id });

        if (!task) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }

        Object.assign(task, updatetaskDto);

        return this.tasksRepository.save(task);
    }

    //REMOVE
    async deleteTask(id: number): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID "${id}" not found.`);
        }
    }
}
