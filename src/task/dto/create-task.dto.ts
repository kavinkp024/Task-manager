import { IsString, IsEnum, IsInt, IsArray, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status,Priority } from '../../enums/enum-task';


export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty() 
  due_date: Date;

  @IsEnum(Priority)
  @IsNotEmpty()
  @ApiProperty()
  priority:Priority;


  @IsEnum(Status)
  @IsNotEmpty()
  @ApiProperty()
  status:Status;

  @ApiProperty()
  @IsArray()
  tags: string[];

  @IsInt()
  @ApiProperty({ example: "number" })
  userId: number;
}