import { db } from "../db/connection.js";

export const getFondos = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM fondo_carrusel WHERE activo = 1 ORDER BY orden"
        );
        res.json(rows);
    } catch (error) {
        console.error("Error getFondos:", error);
        res.status(500).json({ error: "Error obteniendo fondos" });
    }
};

export const createFondo = async (req, res) => {
    try {
        const { titulo, descripcion, url_imagen, orden, activo } = req.body;

        const sql = `
      INSERT INTO fondo_carrusel (titulo, descripcion, url_imagen, orden, activo)
      VALUES (?, ?, ?, ?, ?)
    `;

        const [result] = await db.query(sql, [
            titulo,
            descripcion,
            url_imagen,
            orden ?? 0,
            activo ?? 1,
        ]);

        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error("Error createFondo:", error);
        res.status(500).json({ error: "Error creando fondo" });
    }
};

export const updateFondo = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, url_imagen, orden, activo } = req.body;

        const sql = `
      UPDATE fondo_carrusel
      SET titulo = ?, descripcion = ?, url_imagen = ?, orden = ?, activo = ?
      WHERE id = ?
    `;

        await db.query(sql, [
            titulo,
            descripcion,
            url_imagen,
            orden ?? 0,
            activo ?? 1,
            id,
        ]);

        res.json({ success: true });
    } catch (error) {
        console.error("Error updateFondo:", error);
        res.status(500).json({ error: "Error actualizando fondo" });
    }
};

export const deleteFondo = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM fondo_carrusel WHERE id = ?", [id]);
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleteFondo:", error);
        res.status(500).json({ error: "Error eliminando fondo" });
    }
};
