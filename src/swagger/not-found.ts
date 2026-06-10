import { ApiProperty } from '@nestjs/swagger';

export class NotFound {
    @ApiProperty({ example: 'Given ID not found.' })
    message: string;

    @ApiProperty({ example: 'Not found' })
    error: string;

    @ApiProperty({ example: '404' })
    statusCode: number;
}