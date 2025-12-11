// API para gestión de agenda (turnos)
// Basado en la tabla: agenda

// TODO: Cambiar esta URL por la URL real del backend
const API_URL = 'http://localhost:3001/api/agenda'

/**
 * Obtener lista de turnos con filtros opcionales
 * @param {Object} filtros - Filtros para la búsqueda (fechaDesde, fechaHasta, estado, servicio)
 * @returns {Promise<Array>} Lista de turnos
 */
export async function getTurnos(filtros = {}) {
    try {
        const queryParams = new URLSearchParams(filtros)
        const response = await fetch(`${API_URL}?${queryParams}`)
        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error al obtener turnos:', error)
        throw error
    }
}

/**
 * Crear un nuevo turno
 * @param {Object} turnoData - Datos del turno a crear
 * @returns {Promise<Object>} Turno creado
 */
export async function createTurno(turnoData) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(API_URL, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     ...turnoData,
        //     estado: 'pendiente',
        //     confirmacion_enviada: 0,
        //     recordatorio_enviado: 0,
        //     token_confirmacion: generarToken() // El backend debe generar esto
        //   })
        // })
        // const data = await response.json()

        // TODO: El backend debería:
        // 1. Insertar el registro en la tabla `agenda`
        // 2. Enviar email de confirmación al cliente
        // 3. Programar recordatorio para 24hs antes
        // 4. Retornar el turno creado con su ID

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 800))
        console.log('Turno creado (mock):', turnoData)

        return {
            success: true,
            id: Math.floor(Math.random() * 1000),
            message: 'Turno creado correctamente'
        }
    } catch (error) {
        console.error('Error al crear turno:', error)
        throw error
    }
}

/**
 * Actualizar el estado de un turno
 * @param {number} id - ID del turno
 * @param {string} nuevoEstado - Nuevo estado del turno
 * @returns {Promise<Object>} Resultado de la actualización
 */
export async function updateEstadoTurno(id, nuevoEstado) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(`${API_URL}/${id}/estado`, {
        //   method: 'PATCH',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ estado: nuevoEstado })
        // })
        // const data = await response.json()
        // return data

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log(`Turno ${id} actualizado a estado: ${nuevoEstado}`)

        return {
            success: true,
            message: 'Estado actualizado correctamente'
        }
    } catch (error) {
        console.error('Error al actualizar estado:', error)
        throw error
    }
}

/**
 * Confirmar turno mediante token (usado en emails)
 * @param {string} token - Token de confirmación
 * @returns {Promise<Object>} Resultado de la confirmación
 */
export async function confirmarTurno(token) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(`${API_URL}/confirmar/${token}`, {
        //   method: 'POST'
        // })
        // const data = await response.json()
        // return data

        // El backend debería:
        // 1. Buscar el turno por token_confirmacion
        // 2. Actualizar estado a 'confirmada'
        // 3. Establecer fecha_confirmacion
        // 4. Marcar confirmacion_enviada = 1

        await new Promise(resolve => setTimeout(resolve, 300))
        return { success: true }
    } catch (error) {
        console.error('Error al confirmar turno:', error)
        throw error
    }
}