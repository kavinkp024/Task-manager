import { IsOptional, IsString, IsEnum, IsInt, IsIn, IsDate, IsArray, IsNumberString } from 'class-validator';
import { PaginationTaskDto } from '../../pagination/pagination-task.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Priority, Status } from 'src/enums/enum-task';
import { Transform, Type } from 'class-transformer';

export class TaskQuerydto extends PaginationTaskDto {
    @IsOptional()
    @ApiPropertyOptional()
    @IsEnum(Status)
    status?: Status;

    @IsOptional()
    @ApiPropertyOptional()
    @Type(() => Date)
    @IsDate()
    due_date?: Date;

    @IsOptional()
    @ApiPropertyOptional()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    tags?: string[];

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    @IsIn(['priority', 'due_date'])
    sort_by?: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    sort_order?: 'ASC' | 'DESC';
}