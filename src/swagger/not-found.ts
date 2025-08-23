import { ApiProperty } from '@nestjs/swagger';

export class NotFound {
    @ApiProperty({ example: ' ID not found.' })
    message: string;

    @ApiProperty({ example: 'Not Found' })
    error: string;

    @ApiProperty({ example: '404' })
    statusCode: number;
}