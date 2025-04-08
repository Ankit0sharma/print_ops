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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(loginInput) {
        try {
            // Validate the user by checking the email and password
            const user = await this.userService.validateUser(loginInput.email, loginInput.password);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            // Generate token
            const token = await this.generateToken(user);
            // Return both token and user information
            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async validateToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.userService.findOne(payload.sub);
            return user;
        }
        catch (error) {
            return null;
        }
    }
    generateToken(user) {
        const payload = {
            email: user.email,
            sub: user.id,
        };
        return this.jwtService.sign(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map