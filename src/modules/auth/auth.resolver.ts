import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../../entities/user.entity';
import { LoginResponse } from './dto/login-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<LoginResponse> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async logout(@CurrentUser() user: User): Promise<boolean> {
    // In a real application, you might want to invalidate the token
    // or perform other cleanup tasks
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async validateToken(@Args('token') token: string): Promise<boolean> {
    const user = await this.authService.validateToken(token);
    return !!user;
  }
}
