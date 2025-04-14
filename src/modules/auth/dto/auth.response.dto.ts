// src/modules/auth/dto/auth.response.dto.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../entities/user.entity';

@ObjectType()
export class AuthResponseDto {
  @Field({nullable: true})
  success?: boolean;

  @Field({nullable: true})
  message?: string;

  @Field()
  accessToken: string;

  @Field({nullable: true})
  refreshToken?: string;

  @Field(() => User)
  user: User;
}