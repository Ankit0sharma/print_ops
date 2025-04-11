import { InputType, Field, Float } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceStatus, InvoicePaymentTerms } from '../../../common/enums/invoice.enum';

@InputType()
export class BillingAddressInput {
  @Field()
  @IsString()
  street: string;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  state: string;

  @Field()
  @IsString()
  zip: string;

  @Field()
  @IsString()
  country: string;
}

@InputType()
export class InvoiceItemInput {
  @Field()
  @IsString()
  description: string;

  @Field(() => Float)
  @IsNumber()
  quantity: number;

  @Field(() => Float)
  @IsNumber()
  unitPrice: number;
}

@InputType()
export class CreateInvoiceInput {
  @Field()
  @IsString()
  invoiceNumber: string;

  @Field()
  @IsString()
  customerId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  jobId?: string;

  @Field(() => [InvoiceItemInput])
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemInput)
  items: InvoiceItemInput[];

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  taxRate?: number;

  @Field(() => InvoiceStatus, { nullable: true })
  @IsEnum(InvoiceStatus)
  @IsOptional()
  status?: InvoiceStatus;

  @Field(() => InvoicePaymentTerms, { nullable: true })
  @IsEnum(InvoicePaymentTerms)
  @IsOptional()
  paymentTerms?: InvoicePaymentTerms;

  @Field(() => Date, { nullable: true })
  @Type(() => Date)
  @IsOptional()
  date?: Date;

  @Field(() => Date, { nullable: true })
  @Type(() => Date)
  @IsOptional()
  dueDate?: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  notes?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  paymentInstructions?: string;

  @Field(() => BillingAddressInput)
  @ValidateNested()
  @Type(() => BillingAddressInput)
  billingAddress: BillingAddressInput;
}
