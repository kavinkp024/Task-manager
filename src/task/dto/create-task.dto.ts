import { IsString, Length, IsInt, IsArray, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateTaskDto {
  @IsString()
  @ApiProperty()
  @Length(5, 20)
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsDateString()
  @ApiProperty()
  due_date: Date;

  @IsString()
  @ApiProperty()
  priority: string;


  @IsString()
  @ApiProperty()
  status: string;

  @ApiProperty()
  @IsArray()
  tags: string[];

  @IsInt()
  @ApiProperty({ example: "number" })
  userId: number;
}