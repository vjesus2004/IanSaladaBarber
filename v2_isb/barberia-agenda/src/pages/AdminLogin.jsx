import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login as loginApi } from '../api/authApi'

function AdminLogin() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        usuario: '',
        clave: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // TODO: Aquí se validará contra la tabla `adm` en el backend
            // Endpoint: POST /api/login
            // Body: { usuario, clave }
            // Response: { success: true, usuario: "ian", token: "..." }

            const response = await loginApi(formData.usuario, formData.clave)

            if (response.success) {
                // Guardar datos de usuario en contexto
                login({ usuario: response.usuario })
                navigate('/admin/dashboard')
            } else {
                setError('Usuario o contraseña incorrectos')
            }
        } catch (err) {
            console.error('Error en login:', err)
            setError('Error al intentar iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <div className="bg-barberia-gray rounded-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-barberia-gold mb-2">
                            Acceso Administrativo
                        </h1>
                        <p className="text-gray-400">
                            Ingresa tus credenciales para continuar
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="usuario" className="block text-sm font-medium text-gray-300 mb-2">
                                Usuario
                            </label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                required
                                value={formData.usuario}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                placeholder="Ingresa tu usuario"
                            />
                        </div>

                        <div>
                            <label htmlFor="clave" className="block text-sm font-medium text-gray-300 mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="clave"
                                name="clave"
                                required
                                value={formData.clave}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-md font-bold text-lg transition-colors ${loading
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-barberia-gold text-barberia-dark hover:bg-yellow-500'
                                }`}
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 text-center mt-6">
                        Acceso restringido solo para administradores
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin