import { Router } from "express";
import authController from "./auth.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = Router();

router.post("/login", authController.login);
router.post("/magic-link/request", authController.requestMagicLink);
router.post("/magic-link/verify", authController.verifyMagicLink);
router.get("/me", authMiddleware.requireAuth, authController.getMe);

export default router;
