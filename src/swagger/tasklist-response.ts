import { ApiProperty } from '@nestjs/swagger';
import { List } from './userid-response';

export class TaskList {
        @ApiProperty({ example: 'number' })
        id: number;

        @ApiProperty()
        title: string;

        @ApiProperty()
        description: string;

        @ApiProperty()
        due_date: string;

        @ApiProperty()
        priority: string;

        @ApiProperty()
        status: string;

        @ApiProperty()
        tags: string[];

        @ApiProperty({ example: List })
        user: List;
}

export class TaskCreate {
        @ApiProperty({ example: 'Task created succesfully.' })
        message: string;
}


export class TaskDelete {
        @ApiProperty({ example: 'Task deleted succesfully.' })
        message: string;
}