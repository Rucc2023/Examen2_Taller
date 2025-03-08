import { Router } from "express";
import { getAll, getBye } from "../controllers/productos.controller.ts";

const router = Router();

router.get("/all", getAll);
router.get("/bye", getBye);

export default router;
