
import { Controller, Get, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { loginDto, RegisterDto } from './auth.types';
import { authService } from './auth.service';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class authController {
  constructor(
    private readonly authService: authService,
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDto) {
    return await this.authService.registerUser(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)


  async login(@Body() body: loginDto) {
    return await this.authService.login(body);
  }
}
