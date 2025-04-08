import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { LoginInput } from './dto/login.input';
import { User } from '../../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { LoginResponse } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginInput: LoginInput): Promise<LoginResponse> {
    try {
      // Validate the user by checking the email and password
      const user = await this.userService.validateUser(
        loginInput.email,
        loginInput.password
      );

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate token
      const token = await this.generateToken(user);

      // Return both token and user information
      return { 
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async validateToken(token: string): Promise<User> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findOne(payload.sub);
      return user;
    } catch (error) {
      return null;
    }
  }

  generateToken(user: User) {
    const payload = { 
      email: user.email, 
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
