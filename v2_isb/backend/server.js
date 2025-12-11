import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import agendaRoutes from "./src/routes/agenda.routes.js";
import servicioRoutes from "./src/routes/servicio.routes.js";
import fondoRoutes from "./src/routes/fondo.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import reportesRoutes from "./src/routes/reportes.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/agenda", agendaRoutes);
app.use("/api/servicio", servicioRoutes);
app.use("/api/fondo", fondoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reportes", reportesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Backend corriendo en puerto " + PORT));