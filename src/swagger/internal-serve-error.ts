import { ApiProperty } from '@nestjs/swagger';

export class servererror {
    @ApiProperty({ example: 500 })
    statusCode: number;

    @ApiProperty({ example: 'Internal server error' })
    message: string;
}