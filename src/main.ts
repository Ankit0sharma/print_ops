import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as path from 'path';
import { ApolloDriver } from '@nestjs/apollo';

// Configure environment variables
dotenv.config();

// Create a reusable validation pipe configuration
function createValidationPipe() {
  return new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  });
}

// Local development bootstrap
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply global validation pipe
  app.useGlobalPipes(createValidationPipe());
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
  console.log(`GraphQL Playground: http://localhost:${port}/graphql`);
}

// Serverless deployment configuration
const expressApp = express();

// Centralized error handling middleware
function errorHandler(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Unknown error occurred',
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
  });
}

// Create router with common routes
function createRouter() {
  const router = express.Router();

  // Health check endpoint
  router.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      node_version: process.version,
      memory_usage: process.memoryUsage(),
      uptime: process.uptime(),
    });
  });

  // GraphQL debug endpoint
  router.get('/graphql-debug', (req, res) => {
    res.json({
      serverTime: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      headers: req.headers,
      message: 'GraphQL debug endpoint is working'
    });
  });

  return router;
}

// Serverless NestJS server initialization
async function createNestServer() {
  try {
    // Create NestJS application with Express adapter
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), { 
      logger: ['error', 'warn', 'log'],
      bodyParser: false
    });
    
    // Apply global validation pipe
    app.useGlobalPipes(createValidationPipe());
    
    // Initialize the application
    await app.init();
    
    // Initialize GraphQL schema (if applicable)
    try {
      const graphqlAdapter = app.get(ApolloDriver);
      if (graphqlAdapter) {
        await graphqlAdapter.instance.start();
        console.log('GraphQL schema initialized successfully');
      }
    } catch (error) {
      console.warn('GraphQL schema initialization warning:', error);
    }
    
    return app;
  } catch (error) {
    console.error('NestJS server initialization error:', error);
    throw error;
  }
}

// Configure Express middleware
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

// Add router
expressApp.use('/', createRouter());

// Global error handling
expressApp.use(errorHandler);

// Run bootstrap for local development or initialize serverless
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
} else {
  console.log('Running in production mode (Vercel serverless)');
  createNestServer()
    .then(() => console.log('NestJS server initialized for serverless'))
    .catch(err => {
      console.error('Serverless initialization error:', err);
      process.exit(1);
    });
}

// Export express instance for Vercel
export default expressApp;
