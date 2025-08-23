import { ApiProperty } from '@nestjs/swagger';

export class MetaDtotask {
  @ApiProperty({ example: 'number' })
  total: number;

  @ApiProperty({ example: 'number' })
  page: number;

  @ApiProperty({ example: 'number' })
  limit: number;

}