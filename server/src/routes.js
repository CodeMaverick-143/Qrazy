import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import clubRoutes from "./modules/clubs/club.routes.js";
import eventRoutes from "./modules/events/event.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import ticketRoutes from "./modules/tickets/ticket.routes.js";
import scanRoutes from "./modules/scans/scan.routes.js";
import payoutRoutes from "./modules/payouts/payout.routes.js";
import authMiddleware from "./middlewares/auth.js";

const router = Router();

router.get("/health", (_, res) => {
    res.status(200).json({ status: "UP" });
});

router.use("/auth", authRoutes);
router.use("/clubs", clubRoutes);
router.use("/events", eventRoutes);

router.use(authMiddleware.requireAuth);

router.use("/orders", orderRoutes);
router.use("/tickets", ticketRoutes);
router.use("/scans", scanRoutes);
router.use("/payouts", payoutRoutes);

export default router;