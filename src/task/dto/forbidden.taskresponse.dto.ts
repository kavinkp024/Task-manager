import { ApiProperty } from '@nestjs/swagger';

export class taskForbidden {
    @ApiProperty({ example: "403" })
    status: number;

    @ApiProperty({ example: "This is a custom message." })
    error: string;
}



export class taskForbiddenId {
    @ApiProperty({ example: "403" })
    status: number;

    @ApiProperty({ example: "The expected task ID is not find in database." })
    error: string;
}