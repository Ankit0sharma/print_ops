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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("../../entities/job.entity");
let JobService = class JobService {
    constructor(jobRepository) {
        this.jobRepository = jobRepository;
    }
    // Create a new job
    async createJob(createJobInput) {
        try {
            // Check if job number already exists
            const existingJob = await this.jobRepository.findOne({
                where: { jobNumber: createJobInput.jobNumber },
            });
            if (existingJob) {
                throw new common_1.BadRequestException('Job number already exists');
            }
            const newJob = this.jobRepository.create(createJobInput);
            return this.jobRepository.save(newJob);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    // Find all jobs
    async findAll() {
        return this.jobRepository.find({
            relations: ['customer'],
        });
    }
    // Find jobs by status
    async findByStatus(status) {
        return this.jobRepository.find({
            where: { status: status },
            relations: ['customer'],
        });
    }
    // Find jobs by customer
    async findByCustomer(customerId) {
        return this.jobRepository.find({
            where: { customerId },
            relations: ['customer'],
        });
    }
    // Find jobs due in the next X days
    async findUpcoming(days) {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + days);
        return this.jobRepository.find({
            where: {
                dueDate: (0, typeorm_2.Between)(today, futureDate),
            },
            relations: ['customer'],
        });
    }
    // Find a job by ID
    async findOne(id) {
        const job = await this.jobRepository.findOne({
            where: { id },
            relations: ['customer'],
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        return job;
    }
    // Update a job
    async updateJob(id, updateJobInput) {
        try {
            const job = await this.findOne(id);
            Object.assign(job, updateJobInput);
            return this.jobRepository.save(job);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    // Update job status
    async updateStatus(id, status) {
        const job = await this.findOne(id);
        job.status = status;
        return this.jobRepository.save(job);
    }
    // Delete a job
    async deleteJob(id) {
        try {
            const job = await this.findOne(id);
            await this.jobRepository.remove(job);
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JobService);
//# sourceMappingURL=jobs.service.js.map