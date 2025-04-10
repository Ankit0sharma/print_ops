import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { CustomerType, CustomerStatus } from '../../../common/enums/customer.enum';

@InputType()
export class FilterCustomerInput {
  @Field(() => CustomerStatus, { nullable: true })
  @IsEnum(CustomerStatus)
  @IsOptional()
  status?: CustomerStatus;

  @Field(() => CustomerType, { nullable: true })
  @IsEnum(CustomerType)
  @IsOptional()
  customerType?: CustomerType;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  searchTerm?: string;

  @Field({ nullable: true })
  @IsOptional()
  isActive?: boolean;
}
