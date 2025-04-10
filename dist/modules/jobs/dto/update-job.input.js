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
exports.UpdateJobInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const job_entity_1 = require("../../../entities/job.entity");
const class_transformer_1 = require("class-transformer");
let UpdateJobInput = class UpdateJobInput {
};
exports.UpdateJobInput = UpdateJobInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateJobInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => job_entity_1.JobStatus, { nullable: true }),
    (0, class_validator_1.IsEnum)(job_entity_1.JobStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateJobInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => job_entity_1.JobPriority, { nullable: true }),
    (0, class_validator_1.IsEnum)(job_entity_1.JobPriority),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateJobInput.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateJobInput.prototype, "dueDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateJobInput.prototype, "assignedTo", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateJobInput.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateJobInput.prototype, "isApproved", void 0);
exports.UpdateJobInput = UpdateJobInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateJobInput);
//# sourceMappingURL=update-job.input.js.map