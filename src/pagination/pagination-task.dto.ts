import { IsOptional, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationTaskDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumberString()
  page?: string = '1';

  @IsOptional()
  @ApiPropertyOptional()
  @IsNumberString()
  limit?: string = '10';
}
