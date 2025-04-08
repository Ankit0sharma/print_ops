import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { CustomerType } from '../../../entities/customer.entity';

@InputType()
export class CreateCustomerInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  contactPerson: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  phone: string;

  @Field(() => CustomerType)
  @IsEnum(CustomerType)
  @IsNotEmpty()
  type: CustomerType;

  @Field({ defaultValue: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @Field({ defaultValue: false })
  @IsBoolean()
  @IsOptional()
  isFavorite: boolean;
}
