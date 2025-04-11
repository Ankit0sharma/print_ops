import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, GraphQLISODateTime, Float } from '@nestjs/graphql';
import { Customer } from './customer.entity';
import { Job } from './job.entity';
import { InvoiceStatus, InvoicePaymentTerms } from '../common/enums/invoice.enum';

@ObjectType()
export class InvoiceItem {
  @Field()
  description: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;

  @Field(() => Float)
  amount: number;
}

@ObjectType()
export class BillingAddress {
  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zip: string;

  @Field()
  country: string;
}

@ObjectType()
@Entity('invoices')
export class Invoice {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  invoiceNumber: string; // e.g., INV-2023-1001

  @Field(() => Customer)
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Field()
  @Column()
  customerId: string;

  @Field(() => Job, { nullable: true })
  @ManyToOne(() => Job, { nullable: true })
  @JoinColumn({ name: 'jobId' })
  job?: Job;

  @Field({ nullable: true })
  @Column({ nullable: true })
  jobId?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  issueDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Field(() => [InvoiceItem], { nullable: true })
  @Column({ type: 'json', nullable: true })
  items: InvoiceItem[];

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
  subtotal: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, default: 0 })
  taxRate: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  notes: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  paymentInstructions: string;

  @Field(() => BillingAddress)
  @Column('jsonb')
  billingAddress: BillingAddress;

  @Field(() => InvoiceStatus)
  @Column({
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.DRAFT,
  })
  status: InvoiceStatus;

  @Field(() => InvoicePaymentTerms)
  @Column({
    type: 'enum',
    enum: InvoicePaymentTerms,
    default: InvoicePaymentTerms.DUE_ON_RECEIPT
  })
  paymentTerms: InvoicePaymentTerms;

  @Field()
  @Column({ default: false })
  quickbooksSynced: boolean;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;
}
