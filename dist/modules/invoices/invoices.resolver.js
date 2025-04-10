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
exports.InvoiceResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const invoices_service_1 = require("./invoices.service");
const invoice_entity_1 = require("../../entities/invoice.entity");
const create_invoice_input_1 = require("./dto/create-invoice.input");
const update_invoice_input_1 = require("./dto/update-invoice.input");
let InvoiceResolver = class InvoiceResolver {
    constructor(invoiceService) {
        this.invoiceService = invoiceService;
    }
    async getAllInvoices() {
        return this.invoiceService.findAll();
    }
    async getInvoicesByStatus(status) {
        return this.invoiceService.findByStatus(status);
    }
    async getOverdueInvoices() {
        return this.invoiceService.findOverdue();
    }
    async getInvoicesByMonth(year, month) {
        return this.invoiceService.findByMonth(year, month);
    }
    async getInvoicesByCustomer(customerId) {
        return this.invoiceService.findByCustomer(customerId);
    }
    async getInvoicesByJob(jobId) {
        return this.invoiceService.findByJob(jobId);
    }
    async getTotalOutstanding() {
        return this.invoiceService.calculateTotalOutstanding();
    }
    async getTotalPaidThisMonth() {
        return this.invoiceService.calculateTotalPaidThisMonth();
    }
    async getInvoice(id) {
        return this.invoiceService.findOne(id);
    }
    async createInvoice(createInvoiceInput) {
        return this.invoiceService.createInvoice(createInvoiceInput);
    }
    async updateInvoice(id, updateInvoiceInput) {
        return this.invoiceService.updateInvoice(id, updateInvoiceInput);
    }
    async updateInvoiceStatus(id, status) {
        return this.invoiceService.updateStatus(id, status);
    }
    async markInvoiceAsSynced(id) {
        return this.invoiceService.markAsSynced(id);
    }
    async deleteInvoice(id) {
        return this.invoiceService.deleteInvoice(id);
    }
};
exports.InvoiceResolver = InvoiceResolver;
__decorate([
    (0, graphql_1.Query)(() => [invoice_entity_1.Invoice]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "getAllInvoices", null);
__decorate([
    (0, graphql_1.Query)(() => [invoice_entity_1.Invoice]),
    __param(0, (0, graphql_1.Args)('status', { type: () => invoice_entity_1.InvoiceStatus })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "getInvoicesByStatus", null);
__decorate([
    (0, graphql_1.Query)(() => [invoice_entity_1.Invoice]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "getOverdueInvoices", null);
__decorate([
    (0, graphql_1.Query)(() => [invoice_entity_1.Invoice]),
    __param(0, (0, graphql_1.Args)('year')),
    __param(1, (0, graphql_1.Args)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "getInvoicesByMonth", null);
__decorate([
    (0, graphql_1.Query)(() => [invoice_entity_1.Invoice]),
    __param(0, (0, graphql_1.Args)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "getInvoicesByCustomer", null);
__decorate([
    (0, graphql_1.Query)(() => [invoice_entity_1.Invoice]),
    __param(0, (0, graphql_1.Args)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "getInvoicesByJob", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Float),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "getTotalOutstanding", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Float),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "getTotalPaidThisMonth", null);
__decorate([
    (0, graphql_1.Query)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "getInvoice", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('createInvoiceInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_input_1.CreateInvoiceInput]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "createInvoice", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateInvoiceInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_input_1.UpdateInvoiceInput]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "updateInvoice", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "updateInvoiceStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "markInvoiceAsSynced", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "deleteInvoice", null);
exports.InvoiceResolver = InvoiceResolver = __decorate([
    (0, graphql_1.Resolver)(() => invoice_entity_1.Invoice),
    __metadata("design:paramtypes", [invoices_service_1.InvoiceService])
], InvoiceResolver);
//# sourceMappingURL=invoices.resolver.js.map