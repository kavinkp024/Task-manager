import { IsString } from 'class-validator';

export class CreateTaskDto {

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  due_date: string;

  @IsString()
  priority: string;


  @IsString()
  status: string;


  @IsString()
  tags: string;

  @IsString()
  userId: string;
}