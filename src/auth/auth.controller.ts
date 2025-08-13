import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async signIn(@Body() loginDto: LoginUserDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
}