import { InputType, Field, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { IsOptional, IsUUID, IsEnum, IsDate, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { JobStatus, JobPriority } from '../../../common/enums/job.enum';

@InputType()
export class UpdateJobInput {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => JobStatus, { nullable: true })
  @IsEnum(JobStatus)
  @IsOptional()
  status?: JobStatus;

  @Field(() => JobPriority, { nullable: true })
  @IsEnum(JobPriority)
  @IsOptional()
  priority?: JobPriority;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  width?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  height?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  printMaterial?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  laminateMaterial?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  productionNotes?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  assignedTo?: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  customerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  isApproved?: boolean;
}
