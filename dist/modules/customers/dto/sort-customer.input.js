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
exports.SortCustomerInput = exports.CustomerSortField = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const sort_enum_1 = require("../../../common/enums/sort.enum");
var CustomerSortField;
(function (CustomerSortField) {
    CustomerSortField["NAME"] = "name";
    CustomerSortField["EMAIL"] = "email";
})(CustomerSortField || (exports.CustomerSortField = CustomerSortField = {}));
(0, graphql_1.registerEnumType)(CustomerSortField, {
    name: 'CustomerSortField',
    description: 'Fields that can be sorted on customers'
});
let SortCustomerInput = class SortCustomerInput {
    constructor() {
        this.field = CustomerSortField.NAME;
        this.order = sort_enum_1.SortOrder.ASC;
    }
};
exports.SortCustomerInput = SortCustomerInput;
__decorate([
    (0, graphql_1.Field)(() => CustomerSortField, { nullable: true }),
    (0, class_validator_1.IsEnum)(CustomerSortField),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SortCustomerInput.prototype, "field", void 0);
__decorate([
    (0, graphql_1.Field)(() => sort_enum_1.SortOrder, { nullable: true }),
    (0, class_validator_1.IsEnum)(sort_enum_1.SortOrder),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SortCustomerInput.prototype, "order", void 0);
exports.SortCustomerInput = SortCustomerInput = __decorate([
    (0, graphql_1.InputType)()
], SortCustomerInput);
//# sourceMappingURL=sort-customer.input.js.map