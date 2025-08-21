import { ApiProperty } from '@nestjs/swagger';

export class taskInternalservererror {
    @ApiProperty({ example: 500 })
    statusCode: number;

    @ApiProperty({ example: 'Internal server error' })
    message: string;
}