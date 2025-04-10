"use strict";
// src/config/typeorm.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
// const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
// dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV}` });
// dotenvConfig({ path: `.env` });
console.log('Loaded env variables:', process.env);
const dbUrl = process.env.DATABASE_URL;
console.log("postgres--- ", dbUrl);
// console.log('DATABASE_URL from env:', process.env.DATABASE_URL);
const commonConfig = {
    type: 'postgres',
    url: dbUrl,
    synchronize: false,
    logging: true, // Enable logging to see database queries
    ssl: { rejectUnauthorized: false }, // Always use SSL with rejectUnauthorized: false
    extra: {
        // Ensure TypeORM works better in serverless environments
        connectionLimit: 10,
        max: 10,
        // Add connection timeout settings
        connectTimeout: 30000, // 30 seconds
        idleTimeoutMillis: 30000, // 30 seconds
    },
};
const runtimeConfig = {
    ...commonConfig,
    entities: ['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
};
exports.default = (0, config_1.registerAs)('typeorm', () => runtimeConfig);
// For CLI migrations (if needed later)
exports.connectionSource = new typeorm_1.DataSource({
    ...commonConfig,
    entities: ['src/**/*.entity{.ts,.js}'],
});
//# sourceMappingURL=typeorm.js.map