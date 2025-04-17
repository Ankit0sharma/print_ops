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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
// src/modules/auth/auth.resolver.ts
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const signup_input_1 = require("./dto/signup.input");
const auth_response_dto_1 = require("./dto/auth.response.dto");
const signup_response_1 = require("./dto/signup.response");
const otp_response_1 = require("./dto/otp.response");
const change_password_input_1 = require("./dto/change-password.input");
const refresh_token_input_dto_1 = require("./dto/refresh.token.input.dto");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(input) {
        return this.authService.signUp(input);
    }
    async signIn(email, password) {
        return this.authService.signIn(email, password);
    }
    async signInWithOtp(email) {
        return this.authService.signInWithOtp(email);
    }
    async changePassword(userId, input) {
        return this.authService.changePassword(userId, input);
    }
    async refreshToken(input) {
        return this.authService.refreshToken(input.refreshToken);
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Mutation)(() => signup_response_1.SignUpResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_input_1.SignUpInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signUp", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_response_dto_1.AuthResponseDto),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signIn", null);
__decorate([
    (0, graphql_1.Mutation)(() => otp_response_1.OtpResponse),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signInWithOtp", null);
__decorate([
    (0, graphql_1.Mutation)(() => otp_response_1.OtpResponse),
    __param(0, (0, graphql_1.Args)('userId')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_password_input_1.ChangePasswordInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "changePassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_response_dto_1.AuthResponseDto),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_input_dto_1.RefreshTokenInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "refreshToken", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map