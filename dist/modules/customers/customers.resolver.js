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
exports.CustomerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const customers_service_1 = require("./customers.service");
const customer_entity_1 = require("../../entities/customer.entity");
const create_customer_input_1 = require("./dto/create-customer.input");
const update_customer_input_1 = require("./dto/update-customer.input");
let CustomerResolver = class CustomerResolver {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async getAllCustomers() {
        return this.customerService.findAll();
    }
    async getActiveCustomers() {
        return this.customerService.findActive();
    }
    async getInactiveCustomers() {
        return this.customerService.findInactive();
    }
    async getFavoriteCustomers() {
        return this.customerService.findFavorites();
    }
    async getCustomer(id) {
        return this.customerService.findOne(id);
    }
    async createCustomer(createCustomerInput) {
        return this.customerService.createCustomer(createCustomerInput);
    }
    async updateCustomer(id, updateCustomerInput) {
        return this.customerService.updateCustomer(id, updateCustomerInput);
    }
    async toggleCustomerFavorite(id) {
        return this.customerService.toggleFavorite(id);
    }
    async deleteCustomer(id) {
        return this.customerService.deleteCustomer(id);
    }
};
exports.CustomerResolver = CustomerResolver;
__decorate([
    (0, graphql_1.Query)(() => [customer_entity_1.Customer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "getAllCustomers", null);
__decorate([
    (0, graphql_1.Query)(() => [customer_entity_1.Customer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "getActiveCustomers", null);
__decorate([
    (0, graphql_1.Query)(() => [customer_entity_1.Customer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "getInactiveCustomers", null);
__decorate([
    (0, graphql_1.Query)(() => [customer_entity_1.Customer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "getFavoriteCustomers", null);
__decorate([
    (0, graphql_1.Query)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "getCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('createCustomerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_input_1.CreateCustomerInput]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "createCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateCustomerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_input_1.UpdateCustomerInput]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "updateCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "toggleCustomerFavorite", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "deleteCustomer", null);
exports.CustomerResolver = CustomerResolver = __decorate([
    (0, graphql_1.Resolver)(() => customer_entity_1.Customer),
    __metadata("design:paramtypes", [customers_service_1.CustomerService])
], CustomerResolver);
//# sourceMappingURL=customers.resolver.js.map