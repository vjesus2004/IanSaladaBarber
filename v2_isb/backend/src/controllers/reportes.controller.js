import { db } from "../db/connection.js";

export const getIngresosMensuales = async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT
        YEAR(dia)  AS anio,
        MONTH(dia) AS mes,
        SUM(precio) AS ingresos
      FROM agenda
      WHERE estado = 'completada'
      GROUP BY anio, mes
      ORDER BY anio, mes;
    `);
        res.json(rows);
    } catch (error) {
        console.error("Error getIngresosMensuales:", error);
        res.status(500).json({ error: "Error obteniendo ingresos mensuales" });
    }
};

export const getIngresosAnuales = async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT
        YEAR(dia) AS anio,
        SUM(precio) AS ingresos
      FROM agenda
      WHERE estado = 'completada'
      GROUP BY anio
      ORDER BY anio;
    `);
        res.json(rows);
    } catch (error) {
        console.error("Error getIngresosAnuales:", error);
        res.status(500).json({ error: "Error obteniendo ingresos anuales" });
    }
};