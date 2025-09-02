import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthResponse } from '../swagger/auth-response';
import { AuthToken } from '../swagger/auth-token';

@ApiTags('Logs user into the system')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'Create Login' })
  @ApiResponse({ status: 201, type: AuthToken })
  @ApiResponse({ status: 401, type: AuthResponse })
  async signIn(
    @Body() loginDto: LoginUserDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
} 