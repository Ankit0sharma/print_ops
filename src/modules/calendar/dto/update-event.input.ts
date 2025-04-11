import { InputType, Field, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsUUID, IsString } from 'class-validator';
import { EventType, EventStatus, EventRepeatType } from '../../../common/enums/calendar.enum';

@InputType()
export class UpdateEventInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => EventType, { nullable: true })
  @IsEnum(EventType)
  @IsOptional()
  eventType?: EventType;

  @Field(() => EventStatus, { nullable: true })
  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  startTime?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  endTime?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field(() => EventRepeatType, { nullable: true })
  @IsEnum(EventRepeatType)
  @IsOptional()
  repeatType?: EventRepeatType;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  assignedToId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  jobId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
