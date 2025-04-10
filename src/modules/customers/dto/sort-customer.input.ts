import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum CustomerSortField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  JOB_COUNT = 'jobCount'
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: 'Sort order options'
});

registerEnumType(CustomerSortField, {
  name: 'CustomerSortField',
  description: 'Customer sort field options'
});

@InputType()
export class SortCustomerInput {
  @Field(() => CustomerSortField, { nullable: true })
  @IsEnum(CustomerSortField)
  @IsOptional()
  field?: CustomerSortField = CustomerSortField.NAME;

  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  order?: SortOrder = SortOrder.ASC;
}
