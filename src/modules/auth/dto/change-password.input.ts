import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @Field()
  @IsString()
  @MinLength(6)
  newPassword: string;
}
