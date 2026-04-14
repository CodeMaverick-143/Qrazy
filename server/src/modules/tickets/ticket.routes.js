import { Router } from "express";
import ticketController from "./ticket.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = Router();

router.post("/initialize/:orderId", authMiddleware.requireAuth, ticketController.initializeEntry);

export default router;
