import authService from "./auth.service.js";

class AuthController {
    async login(req, res, next) {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(400).json({ message: "Token is required" });
            }

            const user = await authService.login(token);
            res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    }

    async getMe(req, res, next) {
        try {
            // req.user is attached by AuthMiddleware
            res.status(200).json({ user: req.user });
        } catch (error) {
            next(error);
        }
    }

    async requestMagicLink(req, res, next) {
        // Supabase Magic Link is handled directly from the frontend
        // This endpoint could be used for server-side link generation if needed
        res.status(501).json({ message: "Use Supabase client-side OTP for Magic Link" });
    }

    async verifyMagicLink(req, res, next) {
        // Verification happens via the login/sync endpoint after Supabase confirms the OTP
        res.status(501).json({ message: "Use /auth/login with the Supabase session token to verify" });
    }
}

export default new AuthController();
