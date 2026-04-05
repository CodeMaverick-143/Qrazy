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
      res.status(200).json({ user: req.user });
    } catch (error) {
      next(error);
    }
  }

  async requestMagicLink(req, res, next) {
    res.status(501).json({ message: "Use Supabase client-side OTP for Magic Link" });
  }

  async verifyMagicLink(req, res, next) {
    res.status(501).json({ message: "Use /auth/login with the Supabase session token to verify" });
  }
}

export default new AuthController();
