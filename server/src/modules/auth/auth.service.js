import prisma from "../../config/prisma.js";
import { supabaseAuth } from "../../config/supabase.js";

class AuthService {
    async syncUser(supabaseUser) {
        const { id, email, user_metadata } = supabaseUser;
        const name = user_metadata?.name || user_metadata?.full_name || email.split("@")[0];

        // Sync Supabase user with local database
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                name,
                isEmailVerified: true,
                emailVerifiedAt: new Date(),
            },
            create: {
                email,
                name,
                isEmailVerified: true,
                emailVerifiedAt: new Date(),
            },
        });

        return user;
    }

    async login(token) {
        console.log("Attempting login sync with token:", token ? "Token provided" : "No token");
        // Verify token with Supabase and get user data
        const { data: { user }, error } = await supabaseAuth.auth.getUser(token);

        if (error || !user) {
            console.error("Supabase Auth Error during sync:", error?.message || "No user found");
            const err = new Error(error?.message || "Invalid or expired session");
            err.statusCode = 401; // Explicitly set 401 for auth failures
            throw err;
        }

        return await this.syncUser(user);
    }
}

export default new AuthService();
