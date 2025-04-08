import { Module } from '@nestjs/common';
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

    // ✅ GraphQL config - optimized for playground compatibility
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: process.env.NODE_ENV === 'production' 
          ? true  // Use in-memory schema for production
          : join(process.cwd(), 'src/schema.gql'), // Local development schema file
        sortSchema: true,
        playground: process.env.NODE_ENV !== 'production', // Disable playground in production
        introspection: process.env.NODE_ENV !== 'production', // Disable introspection in production
        context: ({ req, res }) => ({ req, res }),
        installSubscriptionHandlers: false,
        
        // Disable type generation in production
        definitions: process.env.NODE_ENV === 'production' 
          ? undefined 
          : {
              path: join(process.cwd(), 'src/graphql.ts'),
              outputAs: 'class',
            },
      }),
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
export class AppModule {}
