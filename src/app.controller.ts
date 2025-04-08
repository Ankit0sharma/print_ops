import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/graphql', 302)
  redirectToGraphQL() {
    return { url: '/graphql' };
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      node_version: process.version,
      memory_usage: process.memoryUsage(),
      uptime: process.uptime(),
    };
  }
}
