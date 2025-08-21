import { ApiProperty } from '@nestjs/swagger';

export class Unauthorized {
  @ApiProperty({ example: 'Invalid user' })
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: 401 })
  statusCode: number
}