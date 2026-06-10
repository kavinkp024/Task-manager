import { ApiProperty } from '@nestjs/swagger';

export class BadRequest {
  @ApiProperty({ example: 'Bad Request' })
  message: string;

  @ApiProperty({ example: 'The Id is Invalid.' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number
}