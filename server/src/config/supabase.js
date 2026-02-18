import { createClient } from "@supabase/supabase-js";
import env from "./env.js";

class SupabaseService {
    constructor() {
        this.admin = createClient(
            env.SUPABASE_URL,
            env.SUPABASE_SERVICE_ROLE_KEY,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false,
                },
            }
        );

        this.client = createClient(
            env.SUPABASE_URL,
            env.SUPABASE_ANON_KEY,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false,
                },
            }
        );
    }
}

const supabaseService = new SupabaseService();
export const { admin: supabaseAdmin, client: supabaseAuth } = supabaseService;
export default supabaseService;