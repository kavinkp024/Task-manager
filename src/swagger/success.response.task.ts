import { TaskList } from './tasklist-response';
import { ApiProperty } from '@nestjs/swagger';
import { MetaDto } from 'src/swagger/pagination-response';

export class TaskResponse {
    @ApiProperty({
        type: [TaskList]
    })
    data: TaskList[];

    @ApiProperty()
    meta: MetaDto;

}


