import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OtpResponse {
  @Field()
  message: string;
}
