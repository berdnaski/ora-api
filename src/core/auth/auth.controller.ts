import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../../shared/dtos/register.dto';
import { RefreshTokenDto } from '../../shared/dtos/refresh-token.dto';
import { LoginDto } from 'src/shared/dtos/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(
      dto.name,
      dto.email,
      dto.password,
    );

    const tokens = await this.authService.login(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      ...tokens,
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.token);
  }
}
