import { ApiProperty } from '@nestjs/swagger';

export class Forbidden {
    @ApiProperty({ example: '403' })
    status: number;

    @ApiProperty({ example: 'This is a custom message.' })
    error: string;
}



export class ForbiddenId {
    @ApiProperty({ example: '403' })
    status: number;

    @ApiProperty({ example: 'The expected user ID is not find in database.' })
    error: string;
}