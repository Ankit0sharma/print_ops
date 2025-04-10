import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Not, IsNull, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Job } from '../../entities/job.entity';
import { JobStatus } from '../../common/enums/job.enum';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';
import { FilterJobInput } from './dto/filter-job.input';
import { SortJobInput } from './dto/sort-job.input';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  // Create a new job
  async createJob(createJobInput: CreateJobInput): Promise<Job> {
    const job = this.jobRepository.create({
      ...createJobInput,
      status: JobStatus.DESIGN
    });
    
    try {
      const savedJob = await this.jobRepository.save(job);
      // Load the job with customer relation
      return await this.jobRepository.findOne({
        where: { id: savedJob.id },
        relations: ['customer']
      });
    } catch (error) {
      throw new Error(`Failed to create job: ${error.message}`);
    }
  }

  // Find all jobs
  async findAll(filter?: FilterJobInput, sort?: SortJobInput): Promise<Job[]> {
    const queryBuilder = this.jobRepository.createQueryBuilder('job')
      .leftJoinAndSelect('job.customer', 'customer');

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
        queryBuilder.andWhere('job.assignedTo = :assignedTo', { assignedTo: filter.assignedTo });
      }
      if (filter.searchTerm) {
        queryBuilder.andWhere('(job.name ILIKE :search OR job.description ILIKE :search)', 
          { search: `%${filter.searchTerm}%` });
      }
      if (filter.isActive !== undefined) {
        if (filter.isActive) {
          queryBuilder.andWhere('job.status != :completedStatus', { completedStatus: JobStatus.COMPLETED });
        } else {
          queryBuilder.andWhere('job.status = :completedStatus', { completedStatus: JobStatus.COMPLETED });
        }
      }
    }

    if (sort) {
      queryBuilder.orderBy(`job.${sort.field}`, sort.order);
    } else {
      queryBuilder.orderBy('job.createdAt', 'DESC');
    }

    return queryBuilder.getMany();
  }

  // Find jobs by customer
  async findByCustomer(customerId: string): Promise<Job[]> {
    return this.jobRepository.find({
      where: { customerId },
      relations: ['customer'],
    });
  }

  // Find active (non-completed) jobs
  async findActive(): Promise<Job[]> {
    return this.jobRepository.find({
      where: {
        status: Not(JobStatus.COMPLETED)
      },
      relations: ['customer'],
      order: { dueDate: 'ASC' }
    });
  }

  // Find jobs due in the next X days
  async findUpcoming(days: number): Promise<Job[]> {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);
    
    return this.jobRepository.find({
      where: {
        dueDate: Between(today, futureDate),
      },
      relations: ['customer'],
    });
  }

  // Find a job by ID
  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ['customer']
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job;
  }

  // Update a job
  async updateJob(id: string, updateJobInput: UpdateJobInput): Promise<Job> {
    const job = await this.findOne(id);

    // Update the job with new values
    const updatedJob = {
      ...job,
      ...updateJobInput
    };

    try {
      return await this.jobRepository.save(updatedJob);
    } catch (error) {
      throw new Error(`Failed to update job: ${error.message}`);
    }
  }

  // Update job status
  async updateStatus(id: string, status: string): Promise<Job> {
    const job = await this.findOne(id);
    job.status = status as any;
    return this.jobRepository.save(job);
  }

  // Delete a job
  async deleteJob(id: string): Promise<boolean> {
    try {
      const job = await this.findOne(id);
      await this.jobRepository.remove(job);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
