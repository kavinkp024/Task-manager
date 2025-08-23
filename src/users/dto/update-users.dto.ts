import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, Min, IsInt, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @ApiPropertyOptional()
  name: string;

  @IsString()
  @ApiProperty()
  @ApiPropertyOptional()
  password: string;

  @IsEmail()
  @ApiProperty()
  @ApiPropertyOptional()
  email: string;

  @IsInt()
  @ApiProperty()
  @ApiPropertyOptional()
  phone: string;

}