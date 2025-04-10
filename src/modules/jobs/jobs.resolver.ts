import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { Job } from '../../entities/job.entity';
import { JobStatus } from '../../common/enums/job.enum';
import { JobService } from './jobs.service';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';
import { FilterJobInput } from './dto/filter-job.input';
import { SortJobInput } from './dto/sort-job.input';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Query(() => [Job])
  async jobs(
    @Args('filter', { nullable: true }) filter?: FilterJobInput,
    @Args('sort', { nullable: true }) sort?: SortJobInput,
  ): Promise<Job[]> {
    return this.jobService.findAll(filter, sort);
  }



  @Query(() => [Job])
  async upcomingJobs(
    @Args('days', { type: () => Int, defaultValue: 7 }) days: number
  ): Promise<Job[]> {
    return this.jobService.findUpcoming(days);
  }

  @Query(() => Job)
  async job(@Args('id', { type: () => ID }) id: string): Promise<Job> {
    return this.jobService.findOne(id);
  }

  @Mutation(() => Job)
  async createJob(
    @Args('createJobInput') createJobInput: CreateJobInput,
  ): Promise<Job> {
    return this.jobService.createJob(createJobInput);
  }

  @Mutation(() => Job)
  async updateJob(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateJobInput') updateJobInput: UpdateJobInput,
  ): Promise<Job> {
    return this.jobService.updateJob(id, updateJobInput);
  }

  @Mutation(() => Job)
  async updateJobStatus(
    @Args('id') id: string,
    @Args('status') status: string,
  ): Promise<Job> {
    return this.jobService.updateStatus(id, status);
  }

  @Mutation(() => Boolean)
  async deleteJob(@Args('id') id: string): Promise<boolean> {
    return this.jobService.deleteJob(id);
  }
}
