import { Router } from "express";
import payoutController from "./payout.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = Router();

router.post("/request", authMiddleware.requireAuth, payoutController.requestPayout);
router.get("/history/:clubId", authMiddleware.requireAuth, payoutController.getPayoutHistory);
router.get("/earnings/:clubId", authMiddleware.requireAuth, payoutController.getEarnings);

export default router;
