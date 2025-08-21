import { IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateTaskDto {
  @IsString()
  @ApiProperty()
  @ApiPropertyOptional()
  title: string;

  @IsString()
  @ApiProperty()
  @ApiPropertyOptional()
  description: string;

  @IsString()
  @ApiProperty()
  @ApiPropertyOptional()
  due_date: string;

  @IsString()
  @ApiProperty()
  @ApiPropertyOptional()
  priority: string;

  @IsString()
  @ApiProperty()
  @ApiPropertyOptional()
  status: string;

  @IsString()
  @ApiProperty()
  @ApiPropertyOptional()
  tags: string[];

  @IsString()
  @ApiProperty({ example: 'number' })
  @ApiPropertyOptional()
  userId: number;
}