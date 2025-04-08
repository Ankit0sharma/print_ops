import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return 'NestJS API on Vercel 🚀';
  }

  @Get('ping')
  ping(): string {
    return 'pong is working on nest🏓';
  }
}
