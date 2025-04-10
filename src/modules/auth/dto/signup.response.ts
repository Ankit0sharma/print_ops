import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignUpResponse {
  @Field()
  message: string;

  @Field()
  userId: string;
}
