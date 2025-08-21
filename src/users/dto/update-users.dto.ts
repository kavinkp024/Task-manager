import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, Min, IsInt, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @ApiPropertyOptional()
  @Length(5, 20)
  name: string;

  @IsString()
  @ApiProperty()
  @ApiPropertyOptional()
  @Length(5, 50)
  password: string;

  @IsEmail()
  @ApiProperty()
  @ApiPropertyOptional()
  @Length(5, 20)
  email: string;

  @IsInt()
  @ApiProperty()
  @ApiPropertyOptional()
  phone: string;

}