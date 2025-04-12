import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });
@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient;
  private supabaseAdmin: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabaseClient = createClient(
      "https://ppbgiifhlxofnrtzltzj.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYmdpaWZobHhvZm5ydHpsdHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyODAzNjksImV4cCI6MjA1OTg1NjM2OX0.yJZubpnf6U6XhA3GRBsvTp3hd1K_BoJ041PxMe-9Yaw"
    );

    this.supabaseAdmin = createClient(
      "https://ppbgiifhlxofnrtzltzj.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYmdpaWZobHhvZm5ydHpsdHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDI4MDM2OSwiZXhwIjoyMDU5ODU2MzY5fQ.bGYw1i7cigV-IusEABjBc_PxW5ebvMumxbKGrnMugUc"
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
