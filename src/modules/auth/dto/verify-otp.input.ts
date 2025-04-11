import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class VerifyOtpInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  otp: string;
}
