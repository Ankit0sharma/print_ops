import { InputType, Field, GraphQLISODateTime, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsOptional, IsDate, IsUUID, IsNumber, Min } from 'class-validator';
import { JobStatus, JobPriority } from '../../../common/enums/job.enum';
import { Type } from 'class-transformer';

@InputType()
export class CreateJobInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => JobPriority, { defaultValue: JobPriority.NORMAL })
  @IsEnum(JobPriority)
  @IsOptional()
  priority: JobPriority;

  @Field(() => GraphQLISODateTime)
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dueDate: Date;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  width: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  height: number;

  @Field(() => Float, { defaultValue: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  quantity: number;

  @Field()
  @IsNotEmpty()
  printMaterial: string;

  @Field({ nullable: true })
  @IsOptional()
  laminateMaterial?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  productionNotes?: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @Field(() => JobStatus, { defaultValue: JobStatus.DESIGN })
  @IsEnum(JobStatus)
  @IsOptional()
  status: JobStatus;

  @Field({ nullable: true })
  @IsOptional()
  assignedTo?: string;
}
