import { ApiProperty } from '@nestjs/swagger';

export class Forbidden {
    @ApiProperty({ example: '403' })
    status: number;

    @ApiProperty({ example: 'This is a custom message.' })
    error: string;
}



