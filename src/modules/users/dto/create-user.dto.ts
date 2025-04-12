import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsUUID } from 'class-validator';

@InputType()
export class CreateUserInput {
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
  @IsUUID()
  roleId: string;

  @Field({ defaultValue: false })
  isTwoFactorEnabled: boolean;

  @Field({ defaultValue: true })
  isActive: boolean;
}
