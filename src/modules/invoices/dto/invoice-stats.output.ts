import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class InvoiceStatsOutput {
  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  paidCount: number;

  @Field(() => Int)
  pendingCount: number;

  @Field(() => Int)
  overdueCount: number;
}
