import { ApiProperty } from '@nestjs/swagger';

export class UserList {
    @ApiProperty({ example: 'number' })
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty({ example: 'date' })
    created_at: Date;

    @ApiProperty({ example: 'date' })
    updated_at: Date;
}


export class UserCreate {
        @ApiProperty({example:'User created succesfully.'})
        message:string;
}


export class UserDelete {
        @ApiProperty({example:'User deleted succesfully.'})
        message:string;
}
