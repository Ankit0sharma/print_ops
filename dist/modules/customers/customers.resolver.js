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
exports.CustomersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const customers_service_1 = require("./customers.service");
const customer_entity_1 = require("../../entities/customer.entity");
const customer_enum_1 = require("../../common/enums/customer.enum");
const create_customer_input_1 = require("./dto/create-customer.input");
const update_customer_input_1 = require("./dto/update-customer.input");
let CustomersResolver = class CustomersResolver {
    constructor(customersService) {
        this.customersService = customersService;
    }
    async getAllCustomers() {
        return this.customersService.findAll();
    }
    async getActiveCustomers() {
        return this.customersService.findActive();
    }
    async getInactiveCustomers() {
        return this.customersService.findInactive();
    }
    async getCustomer(id) {
        return this.customersService.findOne(id);
    }
    async createCustomer(createCustomerInput) {
        return this.customersService.createCustomer(createCustomerInput);
    }
    async updateCustomer(id, updateCustomerInput) {
        return this.customersService.updateCustomer(id, updateCustomerInput);
    }
    async deleteCustomer(id) {
        return this.customersService.deleteCustomer(id);
    }
    async updateCustomerStatus(id, status) {
        return this.customersService.updateStatus(id, status);
    }
    async updateCustomerType(id, customerType) {
        return this.customersService.updateType(id, customerType);
    }
    async viewCustomerProfile(id) {
        return this.customersService.findOne(id);
    }
};
exports.CustomersResolver = CustomersResolver;
__decorate([
    (0, graphql_1.Query)(() => [customer_entity_1.Customer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "getAllCustomers", null);
__decorate([
    (0, graphql_1.Query)(() => [customer_entity_1.Customer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "getActiveCustomers", null);
__decorate([
    (0, graphql_1.Query)(() => [customer_entity_1.Customer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "getInactiveCustomers", null);
__decorate([
    (0, graphql_1.Query)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "getCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('createCustomerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_input_1.CreateCustomerInput]),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "createCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('updateCustomerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_input_1.UpdateCustomerInput]),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "updateCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "deleteCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('status', { type: () => customer_enum_1.CustomerStatus })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "updateCustomerStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('customerType', { type: () => customer_enum_1.CustomerType })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "updateCustomerType", null);
__decorate([
    (0, graphql_1.Query)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "viewCustomerProfile", null);
exports.CustomersResolver = CustomersResolver = __decorate([
    (0, graphql_1.Resolver)(() => customer_entity_1.Customer),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersResolver);
//# sourceMappingURL=customers.resolver.js.map