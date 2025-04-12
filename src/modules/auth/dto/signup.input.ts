// src/modules/auth/dto/signup.input.ts
import { Field, InputType } from '@nestjs/graphql';
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

  @Field()
  @IsNumber()
  roleId: number;
}