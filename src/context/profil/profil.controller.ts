
import { Controller, Get, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';

@Controller('auth')
export class authController {
  constructor() {}
  
  @Get('profil')
  @HttpCode(HttpStatus.OK)
    Get(@Body() body: any) {
        return { message: 'User profil' };
  }
}
