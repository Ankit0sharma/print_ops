// src/modules/auth/auth.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signup.input';
import { AuthResponseDto } from './dto/auth.response.dto';
import { SignUpResponse } from './dto/signup.response';
import { OtpResponse } from './dto/otp.response';
import { ChangePasswordInput } from './dto/change-password.input';
import { RefreshTokenInput } from './dto/refresh.token.input.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignUpResponse)
  async signUp(@Args('input') input: SignUpInput): Promise<SignUpResponse> {
    return this.authService.signUp(input);
  }

  @Mutation(() => AuthResponseDto)
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AuthResponseDto> {
    return this.authService.signIn(email, password);
  }

  @Mutation(() => OtpResponse)
  async signInWithOtp(@Args('email') email: string): Promise<OtpResponse> {
    return this.authService.signInWithOtp(email);
  }

  @Mutation(() => OtpResponse)
  async changePassword(
    @Args('userId') userId: string,
    @Args('input') input: ChangePasswordInput,
  ): Promise<OtpResponse> {
    return this.authService.changePassword(userId, input);
  }

  @Mutation(() => AuthResponseDto)
async refreshToken(
  @Args('input') input: RefreshTokenInput
): Promise<AuthResponseDto> {
  return this.authService.refreshToken(input.refreshToken);
}
}