import { ApiProperty } from '@nestjs/swagger';

export class Internalservererror {
    @ApiProperty({ example: 500 })
    statusCode: number;

    @ApiProperty({ example: 'Internal server error' })
    message: string;
}