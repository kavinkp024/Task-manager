import { IsString, IsEmail, Length, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @Length(5, 20)
  name: string;

  @IsString()
  @ApiProperty()
  @Length(5, 100)
  password: string;

  @IsEmail()
  @ApiProperty()
  @Length(5, 20)
  email: string;

  @IsString()
  @ApiProperty()
  phone: string;

}