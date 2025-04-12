import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Job } from './job.entity';
import { Invoice } from './invoice.entity';
import { CustomerType, CustomerStatus, transformCustomerType } from '../common/enums/customer.enum';

@ObjectType()
@Entity('customers')
export class Customer {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ default: 'Default Company' })
  companyName: string;

  @Field()
  @Column({ default: 'First Name' })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  website: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  state: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  zipCode: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  notes: string;

  @Field(() => CustomerStatus)
  @Column({
    type: 'enum',
    enum: CustomerStatus,
    default: CustomerStatus.ACTIVE
  })
  status: CustomerStatus;

  @Field(() => CustomerType)
  @Column({
    type: 'varchar',
    default: CustomerType.SMALL_BUSINESS,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => value
    }
  })
  customerType: CustomerType;

  @BeforeInsert()
  @BeforeUpdate()
  transformCustomerType() {
    if (this.customerType) {
      this.customerType = transformCustomerType(this.customerType) as CustomerType;
    }
  }

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  jobTitle: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [Job], { nullable: true })
  @OneToMany(() => Job, job => job.customer)
  jobs: Job[];

  @Field(() => [Invoice], { nullable: true })
  @OneToMany(() => Invoice, invoice => invoice.customer)
  invoices: Invoice[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
