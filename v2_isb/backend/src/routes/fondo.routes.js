import { Router } from "express";
import {
    getFondos,
    createFondo,
    updateFondo,
    deleteFondo,
} from "../controllers/fondo.controller.js";

const router = Router();

router.get("/", getFondos);
router.post("/", createFondo);
router.put("/:id", updateFondo);
router.delete("/:id", deleteFondo);

export default router;
