// src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpInput } from './dto/signup.input';
import { User } from '../../entities/user.entity';
import { AuthResponseDto } from './dto/auth.response.dto';
import { SupabaseService } from '../../config/supabase.config';
import { ChangePasswordInput } from './dto/change-password.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private supabaseService: SupabaseService
  ) {}

  async signUp(input: SignUpInput): Promise<{ message: string; userId: string }> {
    const supabase = this.supabaseService.getAdmin();
    
    try {
      // 1. Create user in Supabase
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: input.email,
        password: input.password,
        email_confirm: false,
        user_metadata: {
          firstName: input.firstName,
          lastName: input.lastName,
          roleId: input.roleId,
        },
      });

      if (authError) {
        throw new Error(authError.message);
      }

      // 2. Create user in our database
      const user = this.userRepository.create({
        id: authData.user.id,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        roleId: input.roleId,
        password: 'SUPABASE_MANAGED',
      });

      await this.userRepository.save(user);

      // 3. Send OTP email
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: input.email,
      });

      if (otpError) {
        throw new Error(otpError.message);
      }

      return {
        message: 'Please check your email for the verification code',
        userId: authData.user.id,
      };
    } catch (error) {
      throw new Error(`Signup failed: ${error.message}`);
    }
  }

  async signIn(email: string, password: string): Promise<AuthResponseDto> {
    const supabase = this.supabaseService.getClient();
    
    try {
      // 1. Sign in with Supabase
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new UnauthorizedException(error.message);
      }

      // 2. Get user from our database
      const user = await this.userRepository.findOne({
        where: { id: authData.user.id },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return {
        token: authData.session.access_token,
        user,
      };
    } catch (error) {
      throw new UnauthorizedException(`Login failed: ${error.message}`);
    }
  }

  async signInWithOtp(email: string): Promise<{ message: string }> {
    const supabase = this.supabaseService.getClient();
    
    try {
      // Check if user exists in our database
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Send OTP for sign in
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        message: 'OTP sent to your email',
      };
    } catch (error) {
      throw new Error(`OTP request failed: ${error.message}`);
    }
  }


  async changePassword(userId: string, input: ChangePasswordInput): Promise<{ message: string }> {
    const supabase = this.supabaseService.getClient();
    
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: input.currentPassword,
      });

      if (signInError) {
        throw new Error('Current password is incorrect');
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: input.newPassword,
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      return {
        message: 'Password changed successfully',
      };
    } catch (error) {
      throw new Error(`Password change failed: ${error.message}`);
    }
  }
}