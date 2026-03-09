import { Router } from "express";
import clubController from "./club.controller.js";

const router = Router();

router.get("/", clubController.getAll);
router.get("/:id", clubController.getById);

export default router;
