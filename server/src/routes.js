import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import clubRoutes from "./modules/clubs/club.routes.js";
import eventRoutes from "./modules/events/event.routes.js";
import passRoutes from "./modules/passes/pass.routes.js";
import scanRoutes from "./modules/scans/scan.routes.js";
import authMiddleware from "./middlewares/auth.js";



const router = Router();


router.get("/health", (_, res) => {
    res.status(200)
})


router.use("/auth", authRoutes);

router.use(authMiddleware.requireAuth);

router.use("/clubs", clubRoutes);
router.use("/events", eventRoutes);
router.use("/passes", passRoutes);
router.use("/scans", scanRoutes);

export default router;