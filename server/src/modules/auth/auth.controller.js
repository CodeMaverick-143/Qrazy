import authService from "./auth.service.js";
import magicLinkService from "./magic-link.service.js";

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
        try {
            const { email } = req.body;
            if (!email) return res.status(400).json({ message: "Email is required" });

            const result = await magicLinkService.requestLink(email);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async verifyMagicLink(req, res, next) {
        try {
            const { email, token } = req.body;
            if (!email || !token) return res.status(400).json({ message: "Email and token required" });

            const user = await magicLinkService.verifyLink(email, token);
            res.status(200).json({ message: "Email verified successfully", user });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
