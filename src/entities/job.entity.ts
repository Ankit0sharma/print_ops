import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Customer } from './customer.entity';
import { User } from './user.entity';
import { JobStatus, JobPriority } from '../common/enums/job.enum';

@ObjectType()
@Entity('jobs')
export class Job {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => JobStatus)
  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.DESIGN,
  })
  status: JobStatus;

  @Field(() => JobPriority)
  @Column({
    type: 'enum',
    enum: JobPriority,
    default: JobPriority.NORMAL,
  })
  priority: JobPriority;

  @Field(() => Float)
  @Column('float')
  width: number;

  @Field(() => Float)
  @Column('float')
  height: number;

  @Field(() => Float)
  @Column('float', { default: 1 })
  quantity: number;

  @Field()
  @Column()
  printMaterial: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  laminateMaterial?: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  productionNotes?: string;

  @Field(() => GraphQLISODateTime)
  @Column()
  dueDate: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'assignedToId' })
  assignedTo?: User;

  @Column({ name: 'assignedToId', type: 'uuid', nullable: true })
  assignedToId?: string;

  @Field(() => Customer)
  @ManyToOne(() => Customer, customer => customer.jobs)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column()
  customerId: string;

  @Field()
  @Column({ default: false })
  isApproved: boolean;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;
}
