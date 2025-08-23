import { MetaDto } from '../pagination/pagination-response';
import { UserList } from '../swagger/userlist-response';
import { ApiProperty } from '@nestjs/swagger';

export class UsersResponse {
    @ApiProperty({
        type: [UserList]
    })
    data: UserList[];

    @ApiProperty()
    meta: MetaDto;

}



