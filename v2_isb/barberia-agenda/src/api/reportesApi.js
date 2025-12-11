// API para obtener reportes e ingresos
// Basado en datos de la tabla: agenda (filtrando por estado='completada')

// TODO: Cambiar esta URL por la URL real del backend
const API_URL = 'http://localhost:3001/api/reportes'

/**
 * Obtener ingresos por año
 * @param {number} year - Año a consultar
 * @returns {Promise<Object>} Datos de ingresos mensuales y totales
 */
export async function getIngresos(year) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(`${API_URL}/ingresos?year=${year}`)
        // const data = await response.json()

        // El backend debería hacer una query tipo:
        // SELECT 
        //   MONTH(dia) as mes,
        //   COUNT(*) as cantidad,
        //   SUM(precio) as total
        // FROM agenda
        // WHERE YEAR(dia) = ? AND estado = 'completada'
        // GROUP BY MONTH(dia)
        // return data

        // DATOS MOCK PARA DESARROLLO
        await new Promise(resolve => setTimeout(resolve, 600))

        const ingresosMensuales = [
            { mes: 1, cantidad: 45, total: 22500.00 },
            { mes: 2, cantidad: 38, total: 19000.00 },
            { mes: 3, cantidad: 52, total: 26000.00 },
            { mes: 4, cantidad: 41, total: 20500.00 },
            { mes: 5, cantidad: 48, total: 24000.00 },
            { mes: 6, cantidad: 55, total: 27500.00 },
            { mes: 7, cantidad: 50, total: 25000.00 },
            { mes: 8, cantidad: 44, total: 22000.00 },
            { mes: 9, cantidad: 47, total: 23500.00 },
            { mes: 10, cantidad: 53, total: 26500.00 },
            { mes: 11, cantidad: 49, total: 24500.00 },
            { mes: 12, cantidad: 58, total: 29000.00 }
        ]

        const totalAnual = ingresosMensuales.reduce((sum, m) => sum + m.total, 0)
        const totalTurnos = ingresosMensuales.reduce((sum, m) => sum + m.cantidad, 0)

        return {
            year,
            ingresos_mensuales: ingresosMensuales,
            total_anual: totalAnual,
            total_turnos: totalTurnos,
            promedio_turno: totalAnual / totalTurnos
        }
    } catch (error) {
        console.error('Error al obtener ingresos:', error)
        throw error
    }
}

/**
 * Obtener estadísticas generales
 * @returns {Promise<Object>} Estadísticas de la barbería
 */
export async function getEstadisticas() {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(`${API_URL}/estadisticas`)
        // const data = await response.json()
        // return data

        // El backend debería hacer queries como:
        // - SELECT COUNT(*) FROM agenda WHERE dia = CURDATE() (turnos de hoy)
        // - SELECT COUNT(*) FROM agenda WHERE estado = 'pendiente' (turnos pendientes)
        // - SELECT COUNT(*), SUM(precio) FROM agenda WHERE MONTH(dia) = MONTH(CURDATE()) AND estado = 'completada' (mes actual)

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 500))

        return {
            turnos_hoy: 8,
            turnos_pendientes: 12,
            turnos_mes: 45,
            ingresos_mes: 22500.00,
            servicios_mas_solicitados: [
                { nombre: 'Corte Clásico', cantidad: 120 },
                { nombre: 'Corte + Barba', cantidad: 85 },
                { nombre: 'Barba Premium', cantidad: 60 }
            ]
        }
    } catch (error) {
        console.error('Error al obtener estadísticas:', error)
        throw error
    }
}

/**
 * Obtener ingresos por servicio
 * @param {number} year - Año a consultar
 * @returns {Promise<Array>} Lista de ingresos por servicio
 */
export async function getIngresosPorServicio(year) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(`${API_URL}/ingresos-por-servicio?year=${year}`)
        // const data = await response.json()

        // El backend debería hacer una query tipo:
        // SELECT 
        //   s.nombre,
        //   COUNT(*) as cantidad,
        //   SUM(a.precio) as total
        // FROM agenda a
        // JOIN servicio s ON a.servicio_id = s.id
        // WHERE YEAR(a.dia) = ? AND a.estado = 'completada'
        // GROUP BY s.id, s.nombre
        // ORDER BY total DESC
        // return data

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 500))

        return [
            { servicio: 'Corte Clásico', cantidad: 180, total: 81000.00 },
            { servicio: 'Corte + Barba', cantidad: 120, total: 78000.00 },
            { servicio: 'Corte Moderno', cantidad: 95, total: 47500.00 },
            { servicio: 'Barba Premium', cantidad: 85, total: 34000.00 },
            { servicio: 'Servicio Completo', cantidad: 40, total: 34000.00 }
        ]
    } catch (error) {
        console.error('Error al obtener ingresos por servicio:', error)
        throw error
    }
}

/**
 * Obtener reportes de clientes frecuentes
 * @param {number} limit - Cantidad de clientes a retornar
 * @returns {Promise<Array>} Lista de clientes más frecuentes
 */
export async function getClientesFrecuentes(limit = 10) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(`${API_URL}/clientes-frecuentes?limit=${limit}`)
        // const data = await response.json()

        // El backend debería hacer una query tipo:
        // SELECT 
        //   nom as nombre,
        //   tel as telefono,
        //   email,
        //   COUNT(*) as total_turnos,
        //   SUM(precio) as total_gastado
        // FROM agenda
        // WHERE estado = 'completada'
        // GROUP BY nom, tel, email
        // ORDER BY total_turnos DESC
        // LIMIT ?
        // return data

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 500))

        return [
            { nombre: 'Juan Pérez', telefono: 99123456, email: 'juan@mail.com', total_turnos: 15, total_gastado: 6750.00 },
            { nombre: 'María González', telefono: 98765432, email: 'maria@mail.com', total_turnos: 12, total_gastado: 7800.00 },
            { nombre: 'Carlos Rodríguez', telefono: 91234567, email: 'carlos@mail.com', total_turnos: 10, total_gastado: 4500.00 },
            { nombre: 'Ana Martínez', telefono: 92345678, email: 'ana@mail.com', total_turnos: 9, total_gastado: 5850.00 },
            { nombre: 'Luis Fernández', telefono: 93456789, email: 'luis@mail.com', total_turnos: 8, total_gastado: 3600.00 }
        ]
    } catch (error) {
        console.error('Error al obtener clientes frecuentes:', error)
        throw error
    }
}