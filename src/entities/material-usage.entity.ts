import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, GraphQLISODateTime, Int } from '@nestjs/graphql';
import { Material } from './material.entity';

@ObjectType()
@Entity('material_usage')
export class MaterialUsage {
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

  @Field(() => String)
  @Column()
  jobId: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  notes?: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  usedAt: Date;
}
