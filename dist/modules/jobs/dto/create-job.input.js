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
exports.CreateJobInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const job_entity_1 = require("../../../entities/job.entity");
const class_transformer_1 = require("class-transformer");
let CreateJobInput = class CreateJobInput {
};
exports.CreateJobInput = CreateJobInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateJobInput.prototype, "jobNumber", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateJobInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => job_entity_1.JobStatus, { defaultValue: job_entity_1.JobStatus.DESIGN }),
    (0, class_validator_1.IsEnum)(job_entity_1.JobStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateJobInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => job_entity_1.JobPriority, { defaultValue: job_entity_1.JobPriority.NORMAL }),
    (0, class_validator_1.IsEnum)(job_entity_1.JobPriority),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateJobInput.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateJobInput.prototype, "dueDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateJobInput.prototype, "assignedTo", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateJobInput.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateJobInput.prototype, "isApproved", void 0);
exports.CreateJobInput = CreateJobInput = __decorate([
    (0, graphql_1.InputType)()
], CreateJobInput);
//# sourceMappingURL=create-job.input.js.map