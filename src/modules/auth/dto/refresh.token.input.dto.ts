// src/modules/auth/dto/refresh-token.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RefreshTokenInput {
@Field(() => String)
  refreshToken: string;
}