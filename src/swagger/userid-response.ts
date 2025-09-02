import { ApiProperty } from '@nestjs/swagger';


export class List {
    @ApiProperty({ example: 'number' })
    id: number

    @ApiProperty()
    name: string

}