import { IsString, IsEmail, IsOptional, IsIn } from 'class-validator';
import { PaginationuserDto } from './pagination-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class userquerydto extends PaginationuserDto {
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    name: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    password: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    @IsIn(['name,id'])
    sortBy?: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    sort_order?: 'ASC' | 'DESC';

}