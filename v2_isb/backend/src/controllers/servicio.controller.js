import { db } from "../db/connection.js";

export const getServicios = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM servicio WHERE activo = 1 ORDER BY nombre"
        );
        res.json(rows);
    } catch (error) {
        console.error("Error getServicios:", error);
        res.status(500).json({ error: "Error obteniendo servicios" });
    }
};

export const createServicio = async (req, res) => {
    try {
        const { nombre, descripcion, precio_base, duracion_minutos, activo } =
            req.body;

        const sql = `
      INSERT INTO servicio (nombre, descripcion, precio_base, duracion_minutos, activo)
      VALUES (?, ?, ?, ?, ?)
    `;

        const [result] = await db.query(sql, [
            nombre,
            descripcion,
            precio_base,
            duracion_minutos,
            activo ?? 1,
        ]);

        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error("Error createServicio:", error);
        res.status(500).json({ error: "Error creando servicio" });
    }
};

export const updateServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio_base, duracion_minutos, activo } =
            req.body;

        const sql = `
      UPDATE servicio
      SET nombre = ?, descripcion = ?, precio_base = ?, duracion_minutos = ?, activo = ?
      WHERE id = ?
    `;

        await db.query(sql, [
            nombre,
            descripcion,
            precio_base,
            duracion_minutos,
            activo ?? 1,
            id,
        ]);

        res.json({ success: true });
    } catch (error) {
        console.error("Error updateServicio:", error);
        res.status(500).json({ error: "Error actualizando servicio" });
    }
};

export const toggleServicioActivo = async (req, res) => {
    try {
        const { id } = req.params;
        const { activo } = req.body;

        await db.query("UPDATE servicio SET activo = ? WHERE id = ?", [
            activo ? 1 : 0,
            id,
        ]);

        res.json({ success: true });
    } catch (error) {
        console.error("Error toggleServicioActivo:", error);
        res.status(500).json({ error: "Error cambiando estado del servicio" });
    }
};
