import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MinLength, IsNumber } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  roleId?: number;

  @Field({ nullable: true })
  @IsOptional()
  isTwoFactorEnabled?: boolean;
}
