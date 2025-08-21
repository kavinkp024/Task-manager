import { IsOptional, IsNumberString, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class PaginationuserDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumberString()
  page?: string = '1';

  @IsOptional()
  @ApiPropertyOptional()
  @IsNumberString()
  limit?: string = '10';

}
