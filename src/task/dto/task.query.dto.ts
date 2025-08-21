import { IsOptional, IsString, IsNumberString, IsInt, IsIn, IsDate } from 'class-validator';
import { PaginationOptionsDto } from '../dto/pagination-options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class taskquerydto extends PaginationOptionsDto {
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsDate()
    due_date?: Date;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    priority?: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    tags?: string[];

    @IsOptional()
    @ApiPropertyOptional()
    @IsInt()
    userId?: number;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    @IsIn(['due_date', 'priority'])
    sort_by?: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    sort_order?: 'ASC' | 'DESC';
}