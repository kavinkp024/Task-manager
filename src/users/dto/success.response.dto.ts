import { MetaDto } from './paginated-response.dto';
import { UserList } from './userlist.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class successresponse {
    @ApiProperty({
        type: [UserList]
    })
    data: UserList[];

    @ApiProperty()
    meta: MetaDto;

}



