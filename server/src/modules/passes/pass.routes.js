import { Router } from "express";
import passController from "./pass.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = Router();

router.post("/order", authMiddleware.requireAuth, passController.createOrder);
router.get("/my-orders", authMiddleware.requireAuth, passController.getMyOrders);
router.post("/initialize/:orderId", authMiddleware.requireAuth, passController.initializeEntry);

export default router;
