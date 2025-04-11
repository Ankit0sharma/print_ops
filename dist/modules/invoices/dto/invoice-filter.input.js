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
exports.InvoiceFilterInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const invoice_enum_1 = require("../../../common/enums/invoice.enum");
let InvoiceFilterInput = class InvoiceFilterInput {
};
exports.InvoiceFilterInput = InvoiceFilterInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], InvoiceFilterInput.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], InvoiceFilterInput.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => invoice_enum_1.InvoiceStatus, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(invoice_enum_1.InvoiceStatus),
    __metadata("design:type", String)
], InvoiceFilterInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], InvoiceFilterInput.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], InvoiceFilterInput.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceFilterInput.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceFilterInput.prototype, "jobId", void 0);
__decorate([
    (0, graphql_1.Field)(() => invoice_enum_1.InvoiceSortField, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(invoice_enum_1.InvoiceSortField),
    __metadata("design:type", String)
], InvoiceFilterInput.prototype, "sortField", void 0);
__decorate([
    (0, graphql_1.Field)(() => invoice_enum_1.SortDirection, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(invoice_enum_1.SortDirection),
    __metadata("design:type", String)
], InvoiceFilterInput.prototype, "sortDirection", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceFilterInput.prototype, "search", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], InvoiceFilterInput.prototype, "quickbooksSynced", void 0);
exports.InvoiceFilterInput = InvoiceFilterInput = __decorate([
    (0, graphql_1.InputType)()
], InvoiceFilterInput);
//# sourceMappingURL=invoice-filter.input.js.map