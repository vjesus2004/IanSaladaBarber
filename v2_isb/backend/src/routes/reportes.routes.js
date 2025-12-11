import { Router } from "express";
import {
    getIngresosMensuales,
    getIngresosAnuales,
} from "../controllers/reportes.controller.js";

const router = Router();

router.get("/mensuales", getIngresosMensuales);
router.get("/anuales", getIngresosAnuales);

export default router;
