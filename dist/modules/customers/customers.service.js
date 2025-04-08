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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../../entities/customer.entity");
let CustomerService = class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    // Create a new customer
    async createCustomer(createCustomerInput) {
        try {
            // Check if customer with this email already exists
            const existingCustomer = await this.customerRepository.findOne({
                where: { email: createCustomerInput.email },
            });
            if (existingCustomer) {
                throw new common_1.BadRequestException('Email is already in use by another customer');
            }
            const newCustomer = this.customerRepository.create(createCustomerInput);
            return this.customerRepository.save(newCustomer);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    // Find all customers
    async findAll() {
        return this.customerRepository.find();
    }
    // Find active customers
    async findActive() {
        return this.customerRepository.find({
            where: { isActive: true },
        });
    }
    // Find inactive customers
    async findInactive() {
        return this.customerRepository.find({
            where: { isActive: false },
        });
    }
    // Find favorite customers
    async findFavorites() {
        return this.customerRepository.find({
            where: { isFavorite: true },
        });
    }
    // Find a customer by ID
    async findOne(id) {
        const customer = await this.customerRepository.findOne({
            where: { id },
            relations: ['jobs'],
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        return customer;
    }
    // Find a customer by email
    async findByEmail(email) {
        return this.customerRepository.findOne({
            where: { email },
        });
    }
    // Update a customer
    async updateCustomer(id, updateCustomerInput) {
        try {
            const customer = await this.findOne(id);
            // If email is being updated, check if it's already in use
            if (updateCustomerInput.email && updateCustomerInput.email !== customer.email) {
                const existingCustomer = await this.findByEmail(updateCustomerInput.email);
                if (existingCustomer && existingCustomer.id !== id) {
                    throw new common_1.BadRequestException('Email is already in use by another customer');
                }
            }
            Object.assign(customer, updateCustomerInput);
            return this.customerRepository.save(customer);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    // Toggle favorite status
    async toggleFavorite(id) {
        const customer = await this.findOne(id);
        customer.isFavorite = !customer.isFavorite;
        return this.customerRepository.save(customer);
    }
    // Delete a customer
    async deleteCustomer(id) {
        try {
            const customer = await this.findOne(id);
            await this.customerRepository.remove(customer);
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customers.service.js.map