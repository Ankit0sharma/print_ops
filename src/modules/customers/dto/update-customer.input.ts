import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { CustomerType } from '../../../entities/customer.entity';

@InputType()
export class UpdateCustomerInput {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  contactPerson?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  phone?: string;

  @Field(() => CustomerType, { nullable: true })
  @IsEnum(CustomerType)
  @IsOptional()
  type?: CustomerType;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean;
}
