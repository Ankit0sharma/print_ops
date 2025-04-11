import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID, IsString, ValidateIf } from 'class-validator';
import { EventType, EventStatus, EventRepeatType } from '../../../common/enums/calendar.enum';

@InputType()
export class CreateEventInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => EventType)
  @IsEnum(EventType)
  eventType: EventType;

  @Field(() => GraphQLISODateTime)
  @IsNotEmpty()
  startTime: Date;

  @Field(() => GraphQLISODateTime)
  @IsNotEmpty()
  endTime: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field(() => EventRepeatType, { defaultValue: EventRepeatType.NONE })
  @IsEnum(EventRepeatType)
  @IsOptional()
  repeatType?: EventRepeatType;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  assignedToId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  jobId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
