import { IsString, IsEnum, IsInt, IsArray, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status,Priority } from '../enum/enum-task';


export class CreateTaskDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsDateString()
  @ApiProperty() 
  due_date: Date;

  @IsEnum(Priority)
  @ApiProperty()
  priority:Priority;


  @IsEnum(Status)
  @ApiProperty()
  status:Status;

  @ApiProperty()
  @IsArray()
  tags: string[];

  @IsInt()
  @ApiProperty({ example: "number" })
  userId: number;
}