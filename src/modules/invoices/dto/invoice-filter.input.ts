import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsInt, Min, IsDate, IsString, IsEnum, IsUUID, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceStatus, InvoiceSortField, SortDirection } from '../../../common/enums/invoice.enum';

@InputType()
export class InvoiceFilterInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @Field(() => InvoiceStatus, { nullable: true })
  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  customerId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  jobId?: string;

  @Field(() => InvoiceSortField, { nullable: true })
  @IsOptional()
  @IsEnum(InvoiceSortField)
  sortField?: InvoiceSortField;

  @Field(() => SortDirection, { nullable: true })
  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection?: SortDirection;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  quickbooksSynced?: boolean;
}
