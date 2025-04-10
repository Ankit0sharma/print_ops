// src/modules/auth/dto/auth.response.dto.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../entities/user.entity';

@ObjectType()
export class AuthResponseDto {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}