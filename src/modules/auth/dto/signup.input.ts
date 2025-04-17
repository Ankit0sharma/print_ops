// src/modules/auth/dto/signup.input.ts
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsNumber } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field(()=> Int)
  @IsNumber()
  roleId: number;
}