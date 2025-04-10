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
exports.FilterJobInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const job_enum_1 = require("../../../common/enums/job.enum");
let FilterJobInput = class FilterJobInput {
};
exports.FilterJobInput = FilterJobInput;
__decorate([
    (0, graphql_1.Field)(() => job_enum_1.JobStatus, { nullable: true }),
    (0, class_validator_1.IsEnum)(job_enum_1.JobStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterJobInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => job_enum_1.JobPriority, { nullable: true }),
    (0, class_validator_1.IsEnum)(job_enum_1.JobPriority),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterJobInput.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterJobInput.prototype, "dueDateFrom", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterJobInput.prototype, "dueDateTo", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterJobInput.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterJobInput.prototype, "assignedTo", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterJobInput.prototype, "searchTerm", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], FilterJobInput.prototype, "isActive", void 0);
exports.FilterJobInput = FilterJobInput = __decorate([
    (0, graphql_1.InputType)()
], FilterJobInput);
//# sourceMappingURL=filter-job.input.js.map