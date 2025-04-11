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
exports.UpdateInvoiceInput = exports.UpdateBillingAddressInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const invoice_enum_1 = require("../../../common/enums/invoice.enum");
const create_invoice_input_1 = require("./create-invoice.input");
let UpdateBillingAddressInput = class UpdateBillingAddressInput {
};
exports.UpdateBillingAddressInput = UpdateBillingAddressInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBillingAddressInput.prototype, "street", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBillingAddressInput.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBillingAddressInput.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBillingAddressInput.prototype, "zip", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBillingAddressInput.prototype, "country", void 0);
exports.UpdateBillingAddressInput = UpdateBillingAddressInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateBillingAddressInput);
let UpdateInvoiceInput = class UpdateInvoiceInput {
};
exports.UpdateInvoiceInput = UpdateInvoiceInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceInput.prototype, "invoiceNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceInput.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceInput.prototype, "jobId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [create_invoice_input_1.InvoiceItemInput], { nullable: true }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_invoice_input_1.InvoiceItemInput),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateInvoiceInput.prototype, "items", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateInvoiceInput.prototype, "taxRate", void 0);
__decorate([
    (0, graphql_1.Field)(() => invoice_enum_1.InvoiceStatus, { nullable: true }),
    (0, class_validator_1.IsEnum)(invoice_enum_1.InvoiceStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => invoice_enum_1.InvoicePaymentTerms, { nullable: true }),
    (0, class_validator_1.IsEnum)(invoice_enum_1.InvoicePaymentTerms),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceInput.prototype, "paymentTerms", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateInvoiceInput.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateInvoiceInput.prototype, "dueDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceInput.prototype, "notes", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceInput.prototype, "paymentInstructions", void 0);
__decorate([
    (0, graphql_1.Field)(() => UpdateBillingAddressInput, { nullable: true }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateBillingAddressInput),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", UpdateBillingAddressInput)
], UpdateInvoiceInput.prototype, "billingAddress", void 0);
exports.UpdateInvoiceInput = UpdateInvoiceInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateInvoiceInput);
//# sourceMappingURL=update-invoice.input.js.map