import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiProperty({ example: "number" })
  total: number;

  @ApiProperty({ example: "number" })
  page: number;

  @ApiProperty({ example: "number" })
  limit: number;

}