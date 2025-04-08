import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => UserResponse)
  user: UserResponse;
}
