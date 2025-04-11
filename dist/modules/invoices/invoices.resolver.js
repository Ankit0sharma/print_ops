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
exports.InvoicesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const invoices_service_1 = require("./invoices.service");
const invoice_entity_1 = require("../../entities/invoice.entity");
const create_invoice_input_1 = require("./dto/create-invoice.input");
const update_invoice_input_1 = require("./dto/update-invoice.input");
const invoice_filter_input_1 = require("./dto/invoice-filter.input");
const invoice_pagination_output_1 = require("./dto/invoice-pagination.output");
const invoice_stats_output_1 = require("./dto/invoice-stats.output");
let InvoicesResolver = class InvoicesResolver {
    constructor(invoicesService) {
        this.invoicesService = invoicesService;
    }
    async invoices(filterInput) {
        return this.invoicesService.findInvoices(filterInput || {});
    }
    async invoice(id) {
        return this.invoicesService.findInvoice(id);
    }
    async stats() {
        return this.invoicesService.getStats();
    }
    async createInvoice(createInvoiceInput) {
        return this.invoicesService.createInvoice(createInvoiceInput);
    }
    async updateInvoice(id, updateInvoiceInput) {
        return this.invoicesService.updateInvoice(id, updateInvoiceInput);
    }
    async deleteInvoice(id) {
        return this.invoicesService.deleteInvoice(id);
    }
};
exports.InvoicesResolver = InvoicesResolver;
__decorate([
    (0, graphql_1.Query)(() => invoice_pagination_output_1.InvoicePaginationOutput),
    __param(0, (0, graphql_1.Args)('filterInput', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invoice_filter_input_1.InvoiceFilterInput]),
    __metadata("design:returntype", Promise)
], InvoicesResolver.prototype, "invoices", null);
__decorate([
    (0, graphql_1.Query)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesResolver.prototype, "invoice", null);
__decorate([
    (0, graphql_1.Query)(() => invoice_stats_output_1.InvoiceStatsOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvoicesResolver.prototype, "stats", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('createInvoiceInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_input_1.CreateInvoiceInput]),
    __metadata("design:returntype", Promise)
], InvoicesResolver.prototype, "createInvoice", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateInvoiceInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_input_1.UpdateInvoiceInput]),
    __metadata("design:returntype", Promise)
], InvoicesResolver.prototype, "updateInvoice", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesResolver.prototype, "deleteInvoice", null);
exports.InvoicesResolver = InvoicesResolver = __decorate([
    (0, graphql_1.Resolver)(() => invoice_entity_1.Invoice),
    __metadata("design:paramtypes", [invoices_service_1.InvoicesService])
], InvoicesResolver);
//# sourceMappingURL=invoices.resolver.js.map