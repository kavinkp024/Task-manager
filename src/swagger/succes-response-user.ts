import { MetaDto } from '../pagination/pagination-response';
import { UserList } from '../swagger/userlist-response';
import { ApiProperty } from '@nestjs/swagger';

export class usersresponse {
    @ApiProperty({
        type: [UserList]
    })
    data: UserList[];

    @ApiProperty()
    meta: MetaDto;

}



