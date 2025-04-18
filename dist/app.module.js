"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const app_resolver_1 = require("./app.resolver");
const config_1 = require("@nestjs/config");
const typeorm_1 = __importDefault(require("./config/typeorm"));
const typeorm_2 = require("@nestjs/typeorm");
const path_1 = require("path");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const customers_module_1 = require("./modules/customers/customers.module");
const jobs_module_1 = require("./modules/jobs/jobs.module");
const invoices_module_1 = require("./modules/invoices/invoices.module");
const materials_module_1 = require("./modules/materials/materials.module");
const calendar_module_1 = require("./modules/calendar/calendar.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV}`,
                load: [typeorm_1.default],
            }),
            typeorm_2.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const typeOrmConfig = configService.get('typeorm');
                    return {
                        ...typeOrmConfig,
                        entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
                    };
                },
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
                sortSchema: true,
                playground: true,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            customers_module_1.CustomerModule,
            jobs_module_1.JobModule,
            invoices_module_1.InvoicesModule,
            materials_module_1.MaterialModule,
            calendar_module_1.CalendarModule,
        ],
        controllers: [],
        providers: [app_resolver_1.AppResolver],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map