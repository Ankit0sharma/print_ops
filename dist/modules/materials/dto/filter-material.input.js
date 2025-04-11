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
exports.FilterMaterialInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const material_enum_1 = require("../../../common/enums/material.enum");
let FilterMaterialInput = class FilterMaterialInput {
};
exports.FilterMaterialInput = FilterMaterialInput;
__decorate([
    (0, graphql_1.Field)(() => material_enum_1.MaterialCategory, { nullable: true }),
    (0, class_validator_1.IsEnum)(material_enum_1.MaterialCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterMaterialInput.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterMaterialInput.prototype, "searchTerm", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], FilterMaterialInput.prototype, "lowStockOnly", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterMaterialInput.prototype, "supplier", void 0);
exports.FilterMaterialInput = FilterMaterialInput = __decorate([
    (0, graphql_1.InputType)()
], FilterMaterialInput);
//# sourceMappingURL=filter-material.input.js.map