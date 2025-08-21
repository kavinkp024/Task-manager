import { MetaDtotask } from './pagination.response.task.dto';
import { TaskList } from './tasklist.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class taskresponse {
    @ApiProperty({
        type: [TaskList]
    })
    data: TaskList[];

    @ApiProperty()
    meta: MetaDtotask;

}


