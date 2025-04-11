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
exports.CreateInvoiceInput = exports.InvoiceItemInput = exports.BillingAddressInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const invoice_enum_1 = require("../../../common/enums/invoice.enum");
let BillingAddressInput = class BillingAddressInput {
};
exports.BillingAddressInput = BillingAddressInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingAddressInput.prototype, "street", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingAddressInput.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingAddressInput.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingAddressInput.prototype, "zip", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingAddressInput.prototype, "country", void 0);
exports.BillingAddressInput = BillingAddressInput = __decorate([
    (0, graphql_1.InputType)()
], BillingAddressInput);
let InvoiceItemInput = class InvoiceItemInput {
};
exports.InvoiceItemInput = InvoiceItemInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceItemInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InvoiceItemInput.prototype, "quantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InvoiceItemInput.prototype, "unitPrice", void 0);
exports.InvoiceItemInput = InvoiceItemInput = __decorate([
    (0, graphql_1.InputType)()
], InvoiceItemInput);
let CreateInvoiceInput = class CreateInvoiceInput {
};
exports.CreateInvoiceInput = CreateInvoiceInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvoiceInput.prototype, "invoiceNumber", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvoiceInput.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceInput.prototype, "jobId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [InvoiceItemInput]),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => InvoiceItemInput),
    __metadata("design:type", Array)
], CreateInvoiceInput.prototype, "items", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateInvoiceInput.prototype, "taxRate", void 0);
__decorate([
    (0, graphql_1.Field)(() => invoice_enum_1.InvoiceStatus, { nullable: true }),
    (0, class_validator_1.IsEnum)(invoice_enum_1.InvoiceStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => invoice_enum_1.InvoicePaymentTerms, { nullable: true }),
    (0, class_validator_1.IsEnum)(invoice_enum_1.InvoicePaymentTerms),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceInput.prototype, "paymentTerms", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateInvoiceInput.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateInvoiceInput.prototype, "dueDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceInput.prototype, "notes", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceInput.prototype, "paymentInstructions", void 0);
__decorate([
    (0, graphql_1.Field)(() => BillingAddressInput),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BillingAddressInput),
    __metadata("design:type", BillingAddressInput)
], CreateInvoiceInput.prototype, "billingAddress", void 0);
exports.CreateInvoiceInput = CreateInvoiceInput = __decorate([
    (0, graphql_1.InputType)()
], CreateInvoiceInput);
//# sourceMappingURL=create-invoice.input.js.map