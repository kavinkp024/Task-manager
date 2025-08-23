import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { authresponse } from '../swagger/auth-response';
import { authtoken } from '../swagger/auth-success';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'Create Login' })
  @ApiResponse({ status: 201, type: authtoken })
  @ApiResponse({ status: 401, type: authresponse })
  async signIn(
    @Body() loginDto: LoginUserDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
} 