// API para gestión de fondos del carrusel
// Basado en la tabla: fondo_carrusel

// TODO: Cambiar esta URL por la URL real del backend
const API_URL = 'http://localhost:3001/api/fondos'

/**
 * Obtener lista de fondos del carrusel
 * @returns {Promise<Array>} Lista de fondos ordenados por campo 'orden'
 */
export async function getFondos() {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(API_URL)
        // const data = await response.json()
        // return data

        // DATOS MOCK PARA DESARROLLO
        await new Promise(resolve => setTimeout(resolve, 400))

        return [
            {
                id: 1,
                titulo: 'Estilo Clásico',
                descripcion: 'Los mejores cortes tradicionales con un toque moderno',
                url_imagen: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
                orden: 1,
                activo: true
            },
            {
                id: 2,
                titulo: 'Barba Perfecta',
                descripcion: 'Cuidado profesional para tu barba',
                url_imagen: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800',
                orden: 2,
                activo: true
            },
            {
                id: 3,
                titulo: 'Cortes Modernos',
                descripcion: 'Las últimas tendencias en barbería',
                url_imagen: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
                orden: 3,
                activo: true
            }
        ]
    } catch (error) {
        console.error('Error al obtener fondos:', error)
        throw error
    }
}

/**
 * Crear un nuevo fondo para el carrusel
 * @param {Object} fondoData - Datos del fondo a crear
 * @returns {Promise<Object>} Fondo creado
 */
export async function createFondo(fondoData) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(API_URL, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(fondoData)
        // })
        // const data = await response.json()
        // return data

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 500))
        console.log('Fondo creado (mock):', fondoData)

        return {
            success: true,
            id: Math.floor(Math.random() * 1000),
            ...fondoData
        }
    } catch (error) {
        console.error('Error al crear fondo:', error)
        throw error
    }
}

/**
 * Actualizar un fondo existente
 * @param {number} id - ID del fondo
 * @param {Object} fondoData - Datos actualizados del fondo
 * @returns {Promise<Object>} Fondo actualizado
 */
export async function updateFondo(id, fondoData) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(`${API_URL}/${id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(fondoData)
        // })
        // const data = await response.json()
        // return data

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 500))
        console.log(`Fondo ${id} actualizado (mock):`, fondoData)

        return {
            success: true,
            id,
            ...fondoData
        }
    } catch (error) {
        console.error('Error al actualizar fondo:', error)
        throw error
    }
}

/**
 * Eliminar un fondo del carrusel
 * @param {number} id - ID del fondo a eliminar
 * @returns {Promise<Object>} Resultado de la operación
 */
export async function deleteFondo(id) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(`${API_URL}/${id}`, {
        //   method: 'DELETE'
        // })
        // const data = await response.json()
        // return data

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log(`Fondo ${id} eliminado`)

        return {
            success: true,
            message: 'Fondo eliminado correctamente'
        }
    } catch (error) {
        console.error('Error al eliminar fondo:', error)
        throw error
    }
}