import { CreateUserDto } from './create-users.dto';
import { PartialType } from '@nestjs/swagger';


export class UpdateUserDto extends PartialType(CreateUserDto) { }
