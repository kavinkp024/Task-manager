import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from './entities/task.entity';
import { TaskQuerydto } from './dto/task-query.dto'


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,
    ) { }


    //POST
    async create(createTaskDto: CreateTaskDto): Promise<Tasks> {
        const newtask = this.tasksRepository.create(createTaskDto);
        return this.tasksRepository.save(newtask);
    }
    

    // get many
    async getManyAndCount(query: TaskQuerydto): Promise<{ data: Tasks[]; total: number, page: number, limit: number }> {
        const page = parseInt(query.page || '1', 10);
        const limit = parseInt(query.limit || '10', 10);
        const skip = (page - 1) * limit;
        const queryBuilder = this.tasksRepository
            .createQueryBuilder('tasks')
            .leftJoinAndSelect('tasks.user', 'user')
            .select(['tasks.id', 'tasks.status', 'tasks.title', 'tasks.description', 'tasks.tags', 'tasks.priority', 'tasks.due_date', 'user.name', 'user.id']);
        try {
            if (query.title) {
                queryBuilder.andWhere('tasks.title LIKE :title', { title: query.title });
            }
            if (query.status) {
                queryBuilder.andWhere('tasks.status = :status', { status: query.status });
            }
            if (query.due_date) {
                queryBuilder.andWhere('tasks.due_date = :due_date', { due_date: query.due_date });
            }
            if (query.priority) {
                queryBuilder.andWhere('tasks.priority = :priority', { priority: query.priority });
            }
            if (query.tags) {
                queryBuilder.andWhere('tasks.tags = :tags', { tags: query.tags });
            }
            if (query.userId) {
                queryBuilder.andWhere('tasks.userId = :userId', { userId: query.userId });
            }
            if (query.sort_by && query.sort_order) {
                queryBuilder.orderBy(`tasks.${query.sort_by}`, query.sort_order);
            } else {
                queryBuilder.orderBy('tasks.id', 'ASC');
            }
            queryBuilder.skip(skip).take(limit);
            const [data, total] = await queryBuilder.getManyAndCount();
            return { data, total, page, limit };
        } catch (error) {
            throw new BadRequestException("Unknown column error.");
        }
    }



    // GET BY ID
    async findOneById(id: number): Promise<Tasks | null | undefined> {
        return this.tasksRepository.findOne({ where: { id } });
    }



    //UPDATE
    async updateTask(id: number, updatetaskDto: UpdateTaskDto): Promise<Tasks> {
        const task = await this.tasksRepository.findOneBy({ id });
        console.log("task",task)
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }
        Object.assign(task, updatetaskDto);
        return this.tasksRepository.save(task);
    }


    //REMOVE
    async deleteTask(id: number): Promise<void> {
        const result = await this.tasksRepository.findOneBy({ id });
        if (result) {
            await this.tasksRepository.remove(result);
        } if (!result) {
            throw new BadRequestException('Bad Request', 'Task Id is Invalid.');
        }
    }
}
