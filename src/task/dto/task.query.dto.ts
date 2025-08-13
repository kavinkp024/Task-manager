import { IsOptional, IsString, IsNumberString, IsIn } from 'class-validator';

export class taskquerydto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsNumberString()
    due_date?: string;

    @IsOptional()
    @IsNumberString()
    priority?: string;

    @IsOptional()
    @IsNumberString()
    tags?: string;

    @IsOptional()
    @IsNumberString()
    userId?: string;

    @IsOptional()
    @IsString()
    @IsIn(['due_date', 'priority'])
    sortBy?: string;

    @IsOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    sortOrder?: 'ASC' | 'DESC';
}