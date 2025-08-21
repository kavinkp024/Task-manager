import { ApiProperty } from '@nestjs/swagger';

export class badrequest {
  @ApiProperty({ example: 'Expected double-quoted property name in JSON at position.' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number
}