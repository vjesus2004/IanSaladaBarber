// API para gestión de servicios
// Basado en la tabla: servicio

// TODO: Cambiar esta URL por la URL real del backend
const API_URL = 'http://localhost:3001/api/servicios';

/**
 * Obtener lista de servicios
 * @param {boolean} soloActivos - Si true, solo retorna servicios activos
 * @returns {Promise<Array>} Lista de servicios
 */
export async function getServicios(soloActivos = false) {
    try {
        // TODO: Implementar llamada real al backend
        // const url = soloActivos ? `${API_URL}?activo=1` : API_URL
        // const response = await fetch(url)
        // const data = await response.json()
        // return data

        // DATOS MOCK PARA DESARROLLO
        await new Promise(resolve => setTimeout(resolve, 400))

        const servicios = [
            {
                id: 1,
                nombre: 'Corte Clásico',
                descripcion: 'Corte tradicional con tijera y máquina',
                precio_base: 450.00,
                duracion_minutos: 30,
                activo: true
            },
            {
                id: 2,
                nombre: 'Corte + Barba',
                descripcion: 'Corte de cabello y arreglo de barba',
                precio_base: 650.00,
                duracion_minutos: 45,
                activo: true
            },
            {
                id: 3,
                nombre: 'Barba Premium',
                descripcion: 'Afeitado y arreglo de barba con productos premium',
                precio_base: 400.00,
                duracion_minutos: 30,
                activo: true
            },
            {
                id: 4,
                nombre: 'Corte Moderno',
                descripcion: 'Corte con estilo moderno y fade',
                precio_base: 500.00,
                duracion_minutos: 40,
                activo: true
            },
            {
                id: 5,
                nombre: 'Servicio Completo',
                descripcion: 'Corte + Barba + Tratamiento capilar',
                precio_base: 850.00,
                duracion_minutos: 60,
                activo: false
            }
        ]

        return soloActivos ? servicios.filter(s => s.activo) : servicios
    } catch (error) {
        console.error('Error al obtener servicios:', error)
        throw error
    }
}

/**
 * Crear un nuevo servicio
 * @param {Object} servicioData - Datos del servicio a crear
 * @returns {Promise<Object>} Servicio creado
 */
export async function createServicio(servicioData) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(API_URL, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(servicioData)
        // })
        // const data = await response.json()
        // return data

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 500))
        console.log('Servicio creado (mock):', servicioData)

        return {
            success: true,
            id: Math.floor(Math.random() * 1000),
            ...servicioData
        }
    } catch (error) {
        console.error('Error al crear servicio:', error)
        throw error
    }
}

/**
 * Actualizar un servicio existente
 * @param {number} id - ID del servicio
 * @param {Object} servicioData - Datos actualizados del servicio
 * @returns {Promise<Object>} Servicio actualizado
 */
export async function updateServicio(id, servicioData) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(`${API_URL}/${id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(servicioData)
        // })
        // const data = await response.json()
        // return data

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 500))
        console.log(`Servicio ${id} actualizado (mock):`, servicioData)

        return {
            success: true,
            id,
            ...servicioData
        }
    } catch (error) {
        console.error('Error al actualizar servicio:', error)
        throw error
    }
}

/**
 * Activar/desactivar un servicio
 * @param {number} id - ID del servicio
 * @param {boolean} activo - Nuevo estado
 * @returns {Promise<Object>} Resultado de la operación
 */
export async function toggleServicioActivo(id, activo) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(`${API_URL}/${id}/toggle`, {
        //   method: 'PATCH',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ activo })
        // })
        // const data = await response.json()
        // return data

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log(`Servicio ${id} ${activo ? 'activado' : 'desactivado'}`)

        return {
            success: true,
            message: `Servicio ${activo ? 'activado' : 'desactivado'} correctamente`
        }
    } catch (error) {
        console.error('Error al cambiar estado del servicio:', error)
        throw error
    }
}