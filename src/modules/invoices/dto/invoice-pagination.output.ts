import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Invoice } from '../../../entities/invoice.entity';

@ObjectType()
export class InvoicePaginationOutput {
  @Field(() => [Invoice])
  items: Invoice[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;
}
