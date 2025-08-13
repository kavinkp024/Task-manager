import { IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  @MinLength(15)
  email: string;

  @IsString()
  @MinLength(10)
  phone: string;

  @IsString()
  @MinLength(10)
  password: string;

}
