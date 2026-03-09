import { Router } from "express";
import passController from "./pass.controller.js";

const router = Router();

router.post("/order", passController.createOrder);
router.get("/my-orders", passController.getMyOrders);

export default router;
