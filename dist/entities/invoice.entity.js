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
exports.Invoice = exports.BillingAddress = exports.InvoiceItem = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const customer_entity_1 = require("./customer.entity");
const job_entity_1 = require("./job.entity");
const invoice_enum_1 = require("../common/enums/invoice.enum");
let InvoiceItem = class InvoiceItem {
};
exports.InvoiceItem = InvoiceItem;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoiceItem.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "quantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "unitPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "amount", void 0);
exports.InvoiceItem = InvoiceItem = __decorate([
    (0, graphql_1.ObjectType)()
], InvoiceItem);
let BillingAddress = class BillingAddress {
};
exports.BillingAddress = BillingAddress;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BillingAddress.prototype, "street", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BillingAddress.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BillingAddress.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BillingAddress.prototype, "zip", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BillingAddress.prototype, "country", void 0);
exports.BillingAddress = BillingAddress = __decorate([
    (0, graphql_1.ObjectType)()
], BillingAddress);
let Invoice = class Invoice {
};
exports.Invoice = Invoice;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Invoice.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Invoice.prototype, "invoiceNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => customer_entity_1.Customer),
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    __metadata("design:type", customer_entity_1.Customer)
], Invoice.prototype, "customer", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Invoice.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => job_entity_1.Job, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => job_entity_1.Job, { nullable: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'jobId' }),
    __metadata("design:type", job_entity_1.Job)
], Invoice.prototype, "job", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "jobId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Invoice.prototype, "issueDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Invoice.prototype, "dueDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [InvoiceItem], { nullable: true }),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Invoice.prototype, "items", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Invoice.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Invoice.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "subtotal", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "taxRate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "notes", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "paymentInstructions", void 0);
__decorate([
    (0, graphql_1.Field)(() => BillingAddress),
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", BillingAddress)
], Invoice.prototype, "billingAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => invoice_enum_1.InvoiceStatus),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: invoice_enum_1.InvoiceStatus,
        default: invoice_enum_1.InvoiceStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Invoice.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => invoice_enum_1.InvoicePaymentTerms),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: invoice_enum_1.InvoicePaymentTerms,
        default: invoice_enum_1.InvoicePaymentTerms.DUE_ON_RECEIPT
    }),
    __metadata("design:type", String)
], Invoice.prototype, "paymentTerms", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Invoice.prototype, "quickbooksSynced", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Invoice.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Invoice.prototype, "updatedAt", void 0);
exports.Invoice = Invoice = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('invoices')
], Invoice);
//# sourceMappingURL=invoice.entity.js.map