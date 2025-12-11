import { Router } from "express";
import {
    getServicios,
    createServicio,
    updateServicio,
    toggleServicioActivo,
} from "../controllers/servicio.controller.js";

const router = Router();

router.get("/", getServicios);
router.post("/", createServicio);
router.put("/:id", updateServicio);
router.patch("/:id/activo", toggleServicioActivo);

export default router;