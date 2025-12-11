// API para autenticación de administradores
// Basado en la tabla: adm

// TODO: Cambiar esta URL por la URL real del backend
const API_URL = 'http://localhost:3001/api/auth'

/**
 * Iniciar sesión de administrador
 * @param {string} usuario - Nombre de usuario
 * @param {string} clave - Contraseña
 * @returns {Promise<Object>} Datos del usuario autenticado
 */
export async function login(usuario, clave) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(`${API_URL}/login`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ usuario, clave })
        // })
        // const data = await response.json()

        // El backend debería:
        // 1. Buscar el usuario en la tabla `adm`
        // 2. Verificar la contraseña (idealmente hasheada con bcrypt)
        // 3. Generar un token JWT
        // 4. Retornar el token y datos del usuario
        // return data

        // SIMULACIÓN - Validación básica contra los datos de ejemplo
        await new Promise(resolve => setTimeout(resolve, 800))

        // Usuario de ejemplo de la base de datos: usuario='ian', clave='ian'
        if (usuario === 'ian' && clave === 'ian') {
            return {
                success: true,
                usuario: 'ian',
                token: 'mock_jwt_token_12345'
            }
        } else {
            return {
                success: false,
                message: 'Credenciales incorrectas'
            }
        }
    } catch (error) {
        console.error('Error en login:', error)
        throw error
    }
}

/**
 * Verificar si el token es válido
 * @param {string} token - Token JWT
 * @returns {Promise<Object>} Resultado de la verificación
 */
export async function verifyToken(token) {
    try {
        // TODO: Implementar llamada real al backend
        // const response = await fetch(`${API_URL}/verify`, {
        //   method: 'POST',
        //   headers: { 
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`
        //   }
        // })
        // const data = await response.json()
        // return data

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 200))
        return { valid: true }
    } catch (error) {
        console.error('Error al verificar token:', error)
        throw error
    }
}

/**
 * Cerrar sesión (opcional, si el backend lo requiere)
 * @param {string} token - Token JWT
 * @returns {Promise<Object>} Resultado del logout
 */
export async function logout(token) {
    try {
        // TODO: Implementar llamada real al backend si es necesario
        // const response = await fetch(`${API_URL}/logout`, {
        //   method: 'POST',
        //   headers: { 
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`
        //   }
        // })
        // const data = await response.json()
        // return data

        // SIMULACIÓN
        await new Promise(resolve => setTimeout(resolve, 200))
        return { success: true }
    } catch (error) {
        console.error('Error al cerrar sesión:', error)
        throw error
    }
}