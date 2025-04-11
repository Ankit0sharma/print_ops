import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';


// dotenvConfig({ path: `.env` });
console.log("process.env.NODE_ENV----------",process.env.NODE_ENV)
dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });

const commonConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    ssl: { rejectUnauthorized: false },
    extra: {
      connectionLimit: 10, 
      max: 10,
      connectTimeout: 30000,
      idleTimeoutMillis: 30000,
    },
  };

const runtimeConfig = {
  ...commonConfig,
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
};

export default registerAs('typeorm', () => runtimeConfig);

// For CLI migrations (if needed later)
export const connectionSource = new DataSource({
    ...commonConfig,
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
  } as DataSourceOptions);
