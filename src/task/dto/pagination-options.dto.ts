import { IsOptional, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationOptionsDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumberString()
  page?: string = '1';

  @IsOptional()
  @ApiPropertyOptional()
  @IsNumberString()
  limit?: string = '10';
}
