import { InputType, Field, Float } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceStatus, InvoicePaymentTerms } from '../../../common/enums/invoice.enum';
import { InvoiceItemInput } from './create-invoice.input';

@InputType()
export class UpdateBillingAddressInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  street?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  city?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  state?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  zip?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  country?: string;
}

@InputType()
export class UpdateInvoiceInput {
  @Field({ nullable: true })
  @IsOptional()
  invoiceNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  customerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  jobId?: string;

  @Field(() => [InvoiceItemInput], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemInput)
  @IsOptional()
  items?: InvoiceItemInput[];

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

  @Field(() => UpdateBillingAddressInput, { nullable: true })
  @ValidateNested()
  @Type(() => UpdateBillingAddressInput)
  @IsOptional()
  billingAddress?: UpdateBillingAddressInput;
}
