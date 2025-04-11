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
const job_enum_1 = require("../../common/enums/job.enum");
let JobService = class JobService {
    constructor(jobRepository) {
        this.jobRepository = jobRepository;
    }
    // Create a new job
    async createJob(createJobInput) {
        // Extract assignedToId from createJobInput if it exists
        const { assignedTo, ...jobData } = createJobInput;
        const job = this.jobRepository.create({
            ...jobData,
            status: job_enum_1.JobStatus.DESIGN,
            assignedToId: assignedTo // Use assignedTo as assignedToId
        });
        try {
            const savedJob = await this.jobRepository.save(job);
            // Load the job with customer and assignedTo relations
            return await this.jobRepository.findOne({
                where: { id: savedJob.id },
                relations: ['customer', 'assignedTo']
            });
        }
        catch (error) {
            throw new Error(`Failed to create job: ${error.message}`);
        }
    }
    // Find all jobs
    async findAll(filter, sort) {
        const queryBuilder = this.jobRepository.createQueryBuilder('job')
            .leftJoinAndSelect('job.customer', 'customer')
            .leftJoinAndSelect('job.assignedTo', 'assignedTo');
        if (filter) {
            if (filter.status) {
                queryBuilder.andWhere('job.status = :status', { status: filter.status });
            }
            if (filter.priority) {
                queryBuilder.andWhere('job.priority = :priority', { priority: filter.priority });
            }
            if (filter.dueDateFrom) {
                queryBuilder.andWhere('job.dueDate >= :dueDateFrom', { dueDateFrom: filter.dueDateFrom });
            }
            if (filter.dueDateTo) {
                queryBuilder.andWhere('job.dueDate <= :dueDateTo', { dueDateTo: filter.dueDateTo });
            }
            if (filter.customerId) {
                queryBuilder.andWhere('job.customerId = :customerId', { customerId: filter.customerId });
            }
            if (filter.assignedTo) {
                queryBuilder.andWhere('job.assignedToId = :assignedToId', { assignedToId: filter.assignedTo });
            }
            if (filter.searchTerm) {
                queryBuilder.andWhere('(job.name ILIKE :search OR job.description ILIKE :search)', { search: `%${filter.searchTerm}%` });
            }
            if (filter.isActive !== undefined) {
                if (filter.isActive) {
                    queryBuilder.andWhere('job.status != :completedStatus', { completedStatus: job_enum_1.JobStatus.COMPLETED });
                }
                else {
                    queryBuilder.andWhere('job.status = :completedStatus', { completedStatus: job_enum_1.JobStatus.COMPLETED });
                }
            }
        }
        if (sort) {
            queryBuilder.orderBy(`job.${sort.field}`, sort.order);
        }
        else {
            queryBuilder.orderBy('job.createdAt', 'DESC');
        }
        return queryBuilder.getMany();
    }
    // Find jobs by customer
    async findByCustomer(customerId) {
        return this.jobRepository.find({
            where: { customerId },
            relations: ['customer', 'assignedTo'],
        });
    }
    // Find active (non-completed) jobs
    async findActive() {
        return this.jobRepository.find({
            where: {
                status: (0, typeorm_2.Not)(job_enum_1.JobStatus.COMPLETED)
            },
            relations: ['customer', 'assignedTo'],
            order: { dueDate: 'ASC' }
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
            relations: ['customer', 'assignedTo'],
        });
    }
    // Find a job by ID
    async findOne(id) {
        const job = await this.jobRepository.findOne({
            where: { id },
            relations: ['customer', 'assignedTo']
        });
        if (!job) {
            throw new common_1.NotFoundException(`Job with ID ${id} not found`);
        }
        return job;
    }
    // Update a job
    async updateJob(id, updateJobInput) {
        const job = await this.findOne(id);
        // Extract assignedTo from updateJobInput if it exists
        const { assignedTo, ...jobData } = updateJobInput;
        // Update the job with new values
        const updatedJob = {
            ...job,
            ...jobData,
            assignedToId: assignedTo || job.assignedToId // Preserve existing assignedToId if not provided
        };
        try {
            await this.jobRepository.save(updatedJob);
            return this.findOne(id); // Reload the job with relations
        }
        catch (error) {
            throw new Error(`Failed to update job: ${error.message}`);
        }
    }
    // Update job status
    async updateStatus(id, status) {
        const job = await this.findOne(id);
        job.status = status;
        await this.jobRepository.save(job);
        return this.findOne(id); // Reload the job with relations
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