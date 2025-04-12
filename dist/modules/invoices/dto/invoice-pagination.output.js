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
exports.InvoicePaginationOutput = void 0;
const graphql_1 = require("@nestjs/graphql");
const invoice_entity_1 = require("../../../entities/invoice.entity");
let InvoicePaginationOutput = class InvoicePaginationOutput {
};
exports.InvoicePaginationOutput = InvoicePaginationOutput;
__decorate([
    (0, graphql_1.Field)(() => [invoice_entity_1.Invoice]),
    __metadata("design:type", Array)
], InvoicePaginationOutput.prototype, "items", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], InvoicePaginationOutput.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], InvoicePaginationOutput.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], InvoicePaginationOutput.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], InvoicePaginationOutput.prototype, "hasMore", void 0);
exports.InvoicePaginationOutput = InvoicePaginationOutput = __decorate([
    (0, graphql_1.ObjectType)()
], InvoicePaginationOutput);
//# sourceMappingURL=invoice-pagination.output.js.map