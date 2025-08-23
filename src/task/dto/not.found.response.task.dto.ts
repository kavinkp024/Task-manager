import { ApiProperty } from '@nestjs/swagger';

export class taskNotFound {
    @ApiProperty({ example:'Task with ID not found.'})
    message: string;

    @ApiProperty({ example:'Not Found'})
    error: string;

    @ApiProperty({ example:'404'})
    statusCode: number;
}