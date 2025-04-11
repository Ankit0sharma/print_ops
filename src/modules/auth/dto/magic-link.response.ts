import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MagicLinkResponse {
  @Field()
  message: string;
}
