import { Router } from "express";

import eventController from "./event.controller.js";

const router = Router();

router.get("/", eventController.getAll);
router.get("/:id", eventController.getById);

export default router;
