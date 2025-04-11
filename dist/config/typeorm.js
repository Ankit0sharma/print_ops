"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
// dotenvConfig({ path: `.env` });
console.log("process.env.NODE_ENV----------", process.env.NODE_ENV);
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV}` });
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
exports.default = (0, config_1.registerAs)('typeorm', () => runtimeConfig);
// For CLI migrations (if needed later)
exports.connectionSource = new typeorm_1.DataSource({
    ...commonConfig,
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
});
//# sourceMappingURL=typeorm.js.map