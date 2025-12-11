import { db } from "../db/connection.js";

export const getAgenda = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT a.dia, a.hora, a.nom, a.tel, a.precio, s.nombre AS nombre_servicio, a.estado FROM agenda a JOIN servicio s ON a.servicio_id = s.id ORDER BY dia, hora;");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo agenda" });
    }
};

export const createTurno = async (req, res) => {
    try {
        const turno = req.body;

        const sql = `
      INSERT INTO agenda 
      (dia, hora, nom, tel, email, nota, servicio_id, precio, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pendiente')
    `;

        const params = [
            turno.dia,
            turno.hora,
            turno.nom,
            turno.tel,
            turno.email,
            turno.nota,
            turno.servicio_id,
            turno.precio,
        ];

        const [result] = await db.query(sql, params);

        res.json({ success: true, id: result.insertId });

    } catch (error) {
        res.status(500).json({ error: "Error al crear turno" });
    }
};
