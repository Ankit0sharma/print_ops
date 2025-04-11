// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from '../../entities/user.entity';
import { SupabaseService } from '../../config/supabase.config';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthResolver, SupabaseService],
  exports: [AuthService],
})
export class AuthModule {}