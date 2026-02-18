import { supabaseAuth } from "../config/supabase.js";
import prisma from "../config/prisma.js";

class AuthMiddleware {
    async requireAuth(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Unauthorized: Warning: No token provided" });
            }

            const token = authHeader.split(" ")[1];

            // Verify token with Supabase
            const { data: { user }, error } = await supabaseAuth.auth.getUser(token);

            if (error || !user) {
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            }

            // Fetch user from local DB to get role and other details
            const dbUser = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (!dbUser) {
                return res.status(401).json({ message: "Unauthorized: User not found in database" });
            }

            req.user = dbUser;
            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            return res.status(401).json({ message: "Unauthorized: Internal error" });
        }
    }
}

export default new AuthMiddleware();
