import { Router } from "express";
import scanController from "./scan.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = Router();

router.post("/process", authMiddleware.requireAuth, scanController.scanQR);
router.get("/history/:clubId", authMiddleware.requireAuth, scanController.getScanHistory);

export default router;
