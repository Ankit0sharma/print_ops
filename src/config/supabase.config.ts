import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { config as dotenvConfig } from 'dotenv';

// dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });
@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient;
  private supabaseAdmin: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabaseClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    this.supabaseAdmin = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    console.log('Supabase URL:-------------'); 
  }

  getClient(): SupabaseClient {
    return this.supabaseClient;
  }

  getAdmin(): SupabaseClient {
    return this.supabaseAdmin;
  }
}
