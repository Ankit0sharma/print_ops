import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, GraphQLISODateTime, Int, Float } from '@nestjs/graphql';
import { Material } from './material.entity';
import { PurchaseOrderStatus } from '../common/enums/material.enum';

@ObjectType()
@Entity('purchase_orders')
export class PurchaseOrder {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Material)
  @ManyToOne(() => Material)
  @JoinColumn({ name: 'materialId' })
  material: Material;

  @Field(() => Int)
  @Column({ type: 'int' })
  quantity: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Field(() => PurchaseOrderStatus)
  @Column({
    type: 'enum',
    enum: PurchaseOrderStatus,
    default: PurchaseOrderStatus.PENDING
  })
  status: PurchaseOrderStatus;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  orderNumber?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  notes?: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  orderedAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  receivedAt?: Date;
}
