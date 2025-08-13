import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'name must be at least 3 characters long' })
  name: string;

  @IsString()
  @MinLength(6,{ message: 'password must be at least 6 characters long' })
  password: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(10,{ message: 'phone must be at least 10' })
  phone: string;

}