import { Router } from "express";
import orderController from "./order.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = Router();

router.post("/", authMiddleware.requireAuth, orderController.createOrder);
router.get("/my-orders", authMiddleware.requireAuth, orderController.getMyOrders);

export default router;
