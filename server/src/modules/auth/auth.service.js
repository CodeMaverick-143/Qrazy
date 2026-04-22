import userRepository from "./user.repository.js";
import { supabaseAuth } from "../../config/supabase.js";

class AuthService {
    async syncUser(supabaseUser) {
        const { id, email, user_metadata } = supabaseUser;
        const name = user_metadata?.name || user_metadata?.full_name || email.split("@")[0];

        const user = await userRepository.upsertByEmail(email, {
            name,
            isEmailVerified: true,
            emailVerifiedAt: new Date(),
        });

        return user;
    }

    async login(token) {
        console.log("Attempting login sync with token:", token ? "Token provided" : "No token");
        const { data: { user }, error } = await supabaseAuth.auth.getUser(token);

        if (error || !user) {
            console.error("Supabase Auth Error during sync:", error?.message || "No user found");
            const err = new Error(error?.message || "Invalid or expired session");
            err.statusCode = 401;
            throw err;
        }

        return await this.syncUser(user);
    }
}

export default new AuthService();
