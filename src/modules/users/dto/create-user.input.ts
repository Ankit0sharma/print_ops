import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsNumber, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsNumber()
  roleId: number;

  @Field({ nullable: true })
  @IsOptional()
  isTwoFactorEnabled?: boolean;
}
