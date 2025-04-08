"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const bcrypt = __importStar(require("bcrypt"));
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
        // Compare the input password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
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
            if (updateUserInput.password) {
                // Hash the new password if provided
                updateUserInput.password = await bcrypt.hash(updateUserInput.password, 10);
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