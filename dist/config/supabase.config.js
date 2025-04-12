"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV}` });
let SupabaseService = class SupabaseService {
    constructor(configService) {
        this.configService = configService;
        this.supabaseClient = (0, supabase_js_1.createClient)("https://ppbgiifhlxofnrtzltzj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYmdpaWZobHhvZm5ydHpsdHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyODAzNjksImV4cCI6MjA1OTg1NjM2OX0.yJZubpnf6U6XhA3GRBsvTp3hd1K_BoJ041PxMe-9Yaw");
        this.supabaseAdmin = (0, supabase_js_1.createClient)("https://ppbgiifhlxofnrtzltzj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYmdpaWZobHhvZm5ydHpsdHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDI4MDM2OSwiZXhwIjoyMDU5ODU2MzY5fQ.bGYw1i7cigV-IusEABjBc_PxW5ebvMumxbKGrnMugUc");
        console.log('Supabase URL:-------------');
    }
    getClient() {
        return this.supabaseClient;
    }
    getAdmin() {
        return this.supabaseAdmin;
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupabaseService);
//# sourceMappingURL=supabase.config.js.map