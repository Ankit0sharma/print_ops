import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import typeorm from './config/typeorm'; 
import { SupabaseService } from './config/supabase.config';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomerModule } from './modules/customers/customers.module';
import { JobModule } from './modules/jobs/jobs.module';
import { MaterialModule } from './modules/materials/materials.module';
import { EventModule } from './modules/events/events.module';
import { InvoiceModule } from './modules/invoices/invoices.module';
import { CSRFProtectionMiddleware } from './apollo-require-preflight';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [typeorm],
    }),

    // ✅ TypeORM using Supabase DATABASE_URL
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const typeOrmConfig = configService.get('typeorm');
        return {
          ...typeOrmConfig,
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        };
      },
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // in-memory schema (safe for serverless)
      sortSchema: true,
      playground: true, // ✅ force enabled for Vercel/production
      introspection: true, // ✅ same here
      context: ({ req, res }) => ({ req, res }),
    }),

    UsersModule,
    AuthModule,
    CustomerModule,
    JobModule,
    MaterialModule,
    EventModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Here you can add middleware that adds CSRF-related headers
    consumer.apply(CSRFProtectionMiddleware).forRoutes('*');
  }
}