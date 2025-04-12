import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsUUID, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(6)
  @IsOptional()
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
  @IsUUID()
  @IsOptional()
  roleId?: string;

  @Field({ nullable: true })
  isTwoFactorEnabled?: boolean;

  @Field({ nullable: true })
  isActive?: boolean;
}
