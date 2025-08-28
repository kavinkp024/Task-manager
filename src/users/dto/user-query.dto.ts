import { IsString, IsEmail, IsOptional, IsIn } from 'class-validator';
import { PaginationUserDto } from '../../pagination/pagination-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class UserQueryDto extends PaginationUserDto {
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
    @IsIn(['name','email','id'])
    sortBy?: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    sort_order?: 'ASC' | 'DESC';

}