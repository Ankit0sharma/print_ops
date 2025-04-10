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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../../entities/customer.entity");
const customer_enum_1 = require("../../common/enums/customer.enum");
const sort_customer_input_1 = require("./dto/sort-customer.input");
const sort_enum_1 = require("../../common/enums/sort.enum");
let CustomersService = class CustomersService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async createCustomer(createCustomerInput) {
        try {
            // Check if customer with this email already exists
            const existingCustomer = await this.findByEmail(createCustomerInput.email);
            if (existingCustomer) {
                throw new common_1.BadRequestException('Email is already in use by another customer');
            }
            const customer = this.customerRepository.create(createCustomerInput);
            return await this.customerRepository.save(customer);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll(filter, sort) {
        const queryBuilder = this.customerRepository.createQueryBuilder('customer')
            .leftJoinAndSelect('customer.jobs', 'jobs');
        // Apply filters
        if (filter) {
            if (filter.status) {
                queryBuilder.andWhere('customer.status = :status', { status: filter.status });
            }
            if (filter.customerType) {
                queryBuilder.andWhere('customer.customerType = :type', { type: filter.customerType });
            }
            if (filter.isActive !== undefined) {
                queryBuilder.andWhere('customer.isActive = :isActive', { isActive: filter.isActive });
            }
            if (filter.searchTerm) {
                queryBuilder.andWhere('(LOWER(customer.companyName) LIKE LOWER(:search) OR '
                    + 'LOWER(customer.firstName) LIKE LOWER(:search) OR '
                    + 'LOWER(customer.lastName) LIKE LOWER(:search) OR '
                    + 'LOWER(customer.email) LIKE LOWER(:search))', { search: `%${filter.searchTerm}%` });
            }
        }
        // Apply sorting
        if (sort) {
            switch (sort.field) {
                case sort_customer_input_1.CustomerSortField.NAME:
                    queryBuilder.orderBy('customer.firstName', sort.order);
                    break;
                case sort_customer_input_1.CustomerSortField.EMAIL:
                    queryBuilder.orderBy('customer.email', sort.order);
                    break;
                default:
                    queryBuilder.orderBy('customer.firstName', sort_enum_1.SortOrder.ASC);
            }
        }
        else {
            queryBuilder.orderBy('customer.firstName', sort_enum_1.SortOrder.ASC);
        }
        return await queryBuilder.getMany();
    }
    async findByEmail(email) {
        return await this.customerRepository.findOne({ where: { email } });
    }
    async findOne(id) {
        const customer = await this.customerRepository.findOne({
            where: { id },
            relations: ['jobs']
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        return customer;
    }
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
            return await this.customerRepository.save(customer);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
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
    async updateStatus(id, status) {
        const customer = await this.findOne(id);
        customer.status = status;
        return await this.customerRepository.save(customer);
    }
    async updateType(id, customerType) {
        const customer = await this.findOne(id);
        customer.customerType = customerType;
        return await this.customerRepository.save(customer);
    }
    async findActive() {
        return this.customerRepository.find({
            where: { status: customer_enum_1.CustomerStatus.ACTIVE }
        });
    }
    async findInactive() {
        return this.customerRepository.find({
            where: { status: customer_enum_1.CustomerStatus.INACTIVE }
        });
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map