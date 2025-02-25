import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('api')
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello from backend!';
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  getProtected(): string {
    return 'Protected route!';
  }
}