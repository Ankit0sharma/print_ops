import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient;
  private supabaseAdmin: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabaseClient = createClient(
      process.env.SUPABASE_URL || "https://unzxwwgyqhtuhvgrsigb.supabase.co",
      process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuenh3d2d5cWh0dWh2Z3JzaWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4MjI2MDUsImV4cCI6MjA1OTM5ODYwNX0.x4swRiQb4PS3iSBQN0k9HpCI94sgZzha1zzx943S2lE"
    );

    this.supabaseAdmin = createClient(
      process.env.SUPABASE_URL || "https://unzxwwgyqhtuhvgrsigb.supabase.co",
      process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYmdpaWZobHhvZm5ydHpsdHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDI4MDM2OSwiZXhwIjoyMDU5ODU2MzY5fQ.bGYw1i7cigV-IusEABjBc_PxW5ebvMumxbKGrnMugUc"
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
