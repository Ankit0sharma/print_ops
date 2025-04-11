// src/modules/auth/dto/signup.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../../../entities/user.entity';

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

  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;
}