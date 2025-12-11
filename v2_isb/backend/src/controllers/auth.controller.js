import { db } from "../db/connection.js";

export const login = async (req, res) => {
    try {
        const { usuario, clave } = req.body;

        const [rows] = await db.query(
            "SELECT * FROM adm WHERE usuario = ? LIMIT 1",
            [usuario]
        );

        if (!rows.length) {
            return res.status(401).json({ error: "Usuario o clave incorrectos" });
        }

        const admin = rows[0];

        // OJO: esto es texto plano, idealmente usar hash.
        if (admin.clave !== clave) {
            return res.status(401).json({ error: "Usuario o clave incorrectos" });
        }

        res.json({ success: true, usuario: admin.usuario });
    } catch (error) {
        console.error("Error login:", error);
        res.status(500).json({ error: "Error en login" });
    }
};
