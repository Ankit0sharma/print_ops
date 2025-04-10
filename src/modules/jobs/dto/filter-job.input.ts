import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsUUID, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { JobStatus, JobPriority } from '../../../common/enums/job.enum';

@InputType()
export class FilterJobInput {
  @Field(() => JobStatus, { nullable: true })
  @IsEnum(JobStatus)
  @IsOptional()
  status?: JobStatus;

  @Field(() => JobPriority, { nullable: true })
  @IsEnum(JobPriority)
  @IsOptional()
  priority?: JobPriority;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dueDateFrom?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dueDateTo?: Date;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  customerId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  assignedTo?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  searchTerm?: string;

  @Field({ nullable: true })
  @IsOptional()
  isActive?: boolean;
}
