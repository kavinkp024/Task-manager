import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Unauthorized } from './dto/auth.response.dto';
import { authsuccess } from './dto/auth.success.dto';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'Create Login' })
  @ApiResponse({ status: 201, type: authsuccess })
  @ApiResponse({ status: 401, type: Unauthorized })
  async signIn(
    @Body() loginDto: LoginUserDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
} 