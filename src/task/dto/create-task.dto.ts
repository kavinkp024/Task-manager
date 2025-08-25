import { IsString, IsEnum, IsInt, IsArray, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


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

  @IsEnum(["low","medium","high"],{
    message:'Valid priority required'
  })
  @ApiProperty()
  priority: "low" | "medium" | "high";


  @IsEnum(["pending","in_progress"," completed"],{
    message:'Valid status required'
  })
  @ApiProperty()
  status: "pending" |" in_progress" | "completed";

  @ApiProperty()
  @IsArray()
  tags: string[];

  @IsInt()
  @ApiProperty({ example: "number" })
  userId: number;
}