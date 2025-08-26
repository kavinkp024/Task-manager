import { IsOptional, IsString,IsEnum, IsInt, IsIn, IsDate, IsArray } from 'class-validator';
import { PaginationOptionsDto } from './pagination-options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Priority, Status } from 'src/enums/enum-task';


export class TaskQuerydto extends PaginationOptionsDto {
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsEnum(Status)
    status?:Status;

    @IsOptional()
    @ApiPropertyOptional()
    @IsDate()
    due_date?: Date;

    @IsOptional()
    @ApiPropertyOptional()
    @IsEnum(Priority)
    priority?:Priority;

    @IsOptional()
    @ApiPropertyOptional()
    @IsArray()
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