import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';
import { Job } from './job.entity';

export enum CustomerType {
  CORPORATE = 'corporate',
  SMALL_BUSINESS = 'small_business',
}

registerEnumType(CustomerType, {
  name: 'CustomerType',
  description: 'Customer type categories',
});

@ObjectType()
@Entity('customers')
export class Customer {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  contactPerson: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field(() => CustomerType)
  @Column({
    type: 'enum',
    enum: CustomerType,
    default: CustomerType.SMALL_BUSINESS,
  })
  type: CustomerType;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @Column({ default: false })
  isFavorite: boolean;

  @OneToMany(() => Job, job => job.customer)
  jobs: Job[];

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;
}
