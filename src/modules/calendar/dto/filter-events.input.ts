import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { EventType, EventStatus } from '../../../common/enums/calendar.enum';

@InputType()
export class FilterEventsInput {
  @Field(() => [EventType], { nullable: true })
  @IsEnum(EventType, { each: true })
  @IsOptional()
  eventTypes?: EventType[];

  @Field(() => [EventStatus], { nullable: true })
  @IsEnum(EventStatus, { each: true })
  @IsOptional()
  statuses?: EventStatus[];

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  startDate?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  endDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  assignedToId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  jobId?: string;
}
