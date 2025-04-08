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
exports.Job = exports.JobPriority = exports.JobStatus = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const customer_entity_1 = require("./customer.entity");
var JobStatus;
(function (JobStatus) {
    JobStatus["DESIGN"] = "design";
    JobStatus["PRODUCTION"] = "production";
    JobStatus["PRINT"] = "print";
    JobStatus["APPROVAL"] = "approval";
    JobStatus["COMPLETED"] = "completed";
})(JobStatus || (exports.JobStatus = JobStatus = {}));
var JobPriority;
(function (JobPriority) {
    JobPriority["HIGH"] = "high";
    JobPriority["NORMAL"] = "normal";
    JobPriority["URGENT"] = "urgent";
})(JobPriority || (exports.JobPriority = JobPriority = {}));
(0, graphql_1.registerEnumType)(JobStatus, {
    name: 'JobStatus',
    description: 'Job status types',
});
(0, graphql_1.registerEnumType)(JobPriority, {
    name: 'JobPriority',
    description: 'Job priority levels',
});
let Job = class Job {
};
exports.Job = Job;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Job.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "jobNumber", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => JobStatus),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: JobStatus,
        default: JobStatus.DESIGN,
    }),
    __metadata("design:type", String)
], Job.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => JobPriority),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: JobPriority,
        default: JobPriority.NORMAL,
    }),
    __metadata("design:type", String)
], Job.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Job.prototype, "dueDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "assignedTo", void 0);
__decorate([
    (0, graphql_1.Field)(() => customer_entity_1.Customer),
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, customer => customer.jobs),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    __metadata("design:type", customer_entity_1.Customer)
], Job.prototype, "customer", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Job.prototype, "isApproved", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Job.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Job.prototype, "updatedAt", void 0);
exports.Job = Job = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('jobs')
], Job);
//# sourceMappingURL=job.entity.js.map