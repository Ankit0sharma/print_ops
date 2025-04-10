import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import { SortOrder } from '../../../common/enums/sort.enum';

export enum CustomerSortField {
  NAME = 'name',
  EMAIL = 'email'
}

registerEnumType(CustomerSortField, {
  name: 'CustomerSortField',
  description: 'Fields that can be sorted on customers'
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
