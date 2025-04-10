"use strict";
// src/config/typeorm.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Determine which .env file to load
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
const envPath = path.resolve(process.cwd(), envFile);
// Check if the file exists and load it
if (fs.existsSync(envPath)) {
    console.log(`Loading environment from ${envPath}`);
    dotenv.config({ path: envPath });
}
else {
    console.log(`Environment file ${envPath} not found, loading default .env`);
    dotenv.config(); // Load default .env file
}
// Get database URL from environment variables
const dbUrl = process.env.DATABASE_URL;
console.log('DATABASE_URL from env:', process.env.DATABASE_URL);
const commonConfig = {
    type: 'postgres',
    url: 'postgresql://postgres.ppbgiifhlxofnrtzltzj:bitcot@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres',
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
console.log('Database config:', commonConfig);
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