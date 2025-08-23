import { ApiProperty } from '@nestjs/swagger';


export class list {
    @ApiProperty({ example: 'number'})
    id: number

    @ApiProperty()
    name: string

}