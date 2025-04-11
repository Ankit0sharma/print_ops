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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const job_entity_1 = require("../../entities/job.entity");
const job_enum_1 = require("../../common/enums/job.enum");
const jobs_service_1 = require("./jobs.service");
const create_job_input_1 = require("./dto/create-job.input");
const update_job_input_1 = require("./dto/update-job.input");
const filter_job_input_1 = require("./dto/filter-job.input");
const sort_job_input_1 = require("./dto/sort-job.input");
let JobResolver = class JobResolver {
    constructor(jobService) {
        this.jobService = jobService;
    }
    async jobs(filter, sort) {
        return this.jobService.findAll(filter, sort);
    }
    async upcomingJobs(days) {
        return this.jobService.findUpcoming(days);
    }
    async job(id) {
        return this.jobService.findOne(id);
    }
    async createJob(createJobInput) {
        return this.jobService.createJob(createJobInput);
    }
    async updateJob(id, updateJobInput) {
        return this.jobService.updateJob(id, updateJobInput);
    }
    async updateJobStatus(id, status) {
        return this.jobService.updateStatus(id, status);
    }
    async deleteJob(id) {
        return this.jobService.deleteJob(id);
    }
};
exports.JobResolver = JobResolver;
__decorate([
    (0, graphql_1.Query)(() => [job_entity_1.Job]),
    __param(0, (0, graphql_1.Args)('filter', { nullable: true })),
    __param(1, (0, graphql_1.Args)('sort', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_job_input_1.FilterJobInput,
        sort_job_input_1.SortJobInput]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "jobs", null);
__decorate([
    (0, graphql_1.Query)(() => [job_entity_1.Job]),
    __param(0, (0, graphql_1.Args)('days', { type: () => graphql_1.Int, defaultValue: 7 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "upcomingJobs", null);
__decorate([
    (0, graphql_1.Query)(() => job_entity_1.Job),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "job", null);
__decorate([
    (0, graphql_1.Mutation)(() => job_entity_1.Job),
    __param(0, (0, graphql_1.Args)('createJobInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_input_1.CreateJobInput]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "createJob", null);
__decorate([
    (0, graphql_1.Mutation)(() => job_entity_1.Job),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('updateJobInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_input_1.UpdateJobInput]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "updateJob", null);
__decorate([
    (0, graphql_1.Mutation)(() => job_entity_1.Job),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('status', { type: () => job_enum_1.JobStatus })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "updateJobStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "deleteJob", null);
exports.JobResolver = JobResolver = __decorate([
    (0, graphql_1.Resolver)(() => job_entity_1.Job),
    __metadata("design:paramtypes", [jobs_service_1.JobService])
], JobResolver);
//# sourceMappingURL=jobs.resolver.js.map