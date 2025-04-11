import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEnum } from 'class-validator';
import { MaterialCategory } from '../../../common/enums/material.enum';

@InputType()
export class FilterMaterialInput {
  @Field(() => MaterialCategory, { nullable: true })
  @IsEnum(MaterialCategory)
  @IsOptional()
  category?: MaterialCategory;

  @Field({ nullable: true })
  @IsOptional()
  searchTerm?: string;

  @Field({ nullable: true })
  @IsOptional()
  lowStockOnly?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  supplier?: string;
}
