import { Router } from "express";
import { getAgenda, createTurno } from "../controllers/agenda.controller.js";

const router = Router();

router.get("/", getAgenda);
router.post("/", createTurno);

export default router;