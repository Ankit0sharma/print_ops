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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    // Create a new user
    async createUser(createUserInput) {
        try {
            // Check if user already exists
            const existingUser = await this.userRepository.findOne({
                where: { email: createUserInput.email },
            });
            if (existingUser) {
                throw new common_1.BadRequestException('Email is already in use');
            }
            // Hash password before saving
            // const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
            const newUser = this.userRepository.create({
                ...createUserInput,
            });
            return this.userRepository.save(newUser);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    // Find user by email
    async findByEmail(email) {
        return this.userRepository.findOne({
            where: { email },
        });
    }
    // Find a user by ID
    async findOne(id) {
        return this.userRepository.findOne({
            where: { id },
        });
    }
    // Validate a user by checking email and password
    async validateUser(email, password) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        if (password !== user.password) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        return user;
    }
    // Update a user
    async updateUser(id, updateUserInput) {
        try {
            const user = await this.findOne(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            Object.assign(user, updateUserInput);
            return this.userRepository.save(user);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll() {
        return this.userRepository.find();
    }
    // Delete a user
    async deleteUser(id) {
        try {
            const user = await this.findOne(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            await this.userRepository.remove(user);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=users.service.js.map