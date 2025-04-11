import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { EventType, EventStatus, EventRepeatType } from '../common/enums/calendar.enum';
import { User } from './user.entity';
import { Job } from './job.entity';

@ObjectType()
@Entity('calendar_events')
export class CalendarEvent {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field(() => EventType)
  @Column({
    type: 'enum',
    enum: EventType,
  })
  eventType: EventType;

  @Field(() => EventStatus)
  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.SCHEDULED
  })
  status: EventStatus;

  @Field(() => GraphQLISODateTime)
  @Column()
  startTime: Date;

  @Field(() => GraphQLISODateTime)
  @Column()
  endTime: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location?: string;

  @Field(() => EventRepeatType)
  @Column({
    type: 'enum',
    enum: EventRepeatType,
    default: EventRepeatType.NONE
  })
  repeatType: EventRepeatType;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'assignedToId' })
  assignedTo?: User;

  @Column({ name: 'assignedToId', type: 'uuid', nullable: true })
  assignedToId?: string;

  @Field(() => Job, { nullable: true })
  @ManyToOne(() => Job, { eager: true, nullable: true })
  @JoinColumn({ name: 'jobId' })
  relatedJob?: Job;

  @Column({ name: 'jobId', type: 'uuid', nullable: true })
  jobId?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;
}
