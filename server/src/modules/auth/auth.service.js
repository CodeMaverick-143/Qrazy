import prisma from "../../config/prisma.js";
import { supabaseAuth } from "../../config/supabase.js";

class AuthService {
    async syncUser(supabaseUser) {
        const { id, email, user_metadata } = supabaseUser;
        const name = user_metadata?.name || user_metadata?.full_name || email.split("@")[0];

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return existingUser;
        }


        const newUser = await prisma.user.create({
            data: {
                email,
                name,
            },
        });

        return newUser;
    }

    async login(token) {
        const { data: { user }, error } = await supabaseAuth.auth.getUser(token);

        if (error || !user) {
            throw new Error("Invalid token");
        }

        return await this.syncUser(user);
    }
}

export default new AuthService();
