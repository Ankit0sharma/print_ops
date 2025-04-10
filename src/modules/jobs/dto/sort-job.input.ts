import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { SortOrder } from '../../../common/enums/sort.enum';

export enum JobSortField {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DUE_DATE = 'dueDate',
  NAME = 'name',
  PRIORITY = 'priority',
  STATUS = 'status'
}

registerEnumType(JobSortField, {
  name: 'JobSortField',
  description: 'Fields that can be sorted on jobs'
});

@InputType()
export class SortJobInput {
  @Field(() => JobSortField)
  @IsEnum(JobSortField)
  field: JobSortField = JobSortField.CREATED_AT;

  @Field(() => SortOrder)
  @IsEnum(SortOrder)
  order: SortOrder = SortOrder.DESC;
}
