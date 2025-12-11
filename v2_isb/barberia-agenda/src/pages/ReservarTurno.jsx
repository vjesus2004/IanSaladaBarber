import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTurno } from '../api/agendaApi'
import { getServicios } from '../api/servicioApi'
import LoadingSpinner from '../components/LoadingSpinner'

function ReservarTurno() {
    const navigate = useNavigate()
    const [servicios, setServicios] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [showConfirmacion, setShowConfirmacion] = useState(false)

    const [formData, setFormData] = useState({
        dia: '',
        hora: '',
        nom: '',
        tel: '',
        email: '',
        servicio_id: '',
        nota: '',
        opcional: false
    })

    useEffect(() => {
        cargarServicios()
    }, [])

    const cargarServicios = async () => {
        try {
            const data = await getServicios()
            // Filtrar solo servicios activos
            setServicios(data.filter(s => s.activo))
        } catch (error) {
            console.error('Error al cargar servicios:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            // TODO: Aquí se enviará la reserva al backend
            // El backend debería:
            // 1. Crear el registro en la tabla `agenda` con estado = 'pendiente'
            // 2. Generar un token_confirmacion único
            // 3. Establecer confirmacion_enviada = 0, recordatorio_enviado = 0
            // 4. Enviar email de confirmación al cliente con el token
            // 5. Programar el envío de recordatorio 24hs antes

            const servicioSeleccionado = servicios.find(
                s => s.id === parseInt(formData.servicio_id)
            )

            const turnoData = {
                ...formData,
                precio: servicioSeleccionado?.precio_base || 0,
                estado: 'pendiente'
            }

            await createTurno(turnoData)

            setShowConfirmacion(true)

            // Resetear formulario
            setFormData({
                dia: '',
                hora: '',
                nom: '',
                tel: '',
                email: '',
                servicio_id: '',
                nota: '',
                opcional: false
            })

        } catch (error) {
            console.error('Error al crear turno:', error)
            alert('Hubo un error al reservar el turno. Por favor intenta nuevamente.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    // Generar horarios disponibles (ejemplo: de 9:00 a 20:00 cada 30 min)
    const generarHorarios = () => {
        const horarios = []
        for (let h = 9; h <= 19; h++) {
            horarios.push(`${h.toString().padStart(2, '0')}:00`)
            horarios.push(`${h.toString().padStart(2, '0')}:30`)
        }
        horarios.push('20:00')
        return horarios
    }

    if (loading) {
        return <LoadingSpinner message="Cargando formulario..." />
    }

    if (showConfirmacion) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full bg-barberia-gray rounded-lg p-8 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-3xl font-bold text-barberia-gold mb-4">
                        ¡Turno Reservado!
                    </h2>
                    <p className="text-gray-300 mb-6">
                        Tu turno ha sido reservado exitosamente. Recibirás un email de confirmación
                        en los próximos minutos.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-barberia-gold text-barberia-dark px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
                        >
                            Volver al Inicio
                        </button>
                        <button
                            onClick={() => setShowConfirmacion(false)}
                            className="w-full bg-gray-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors"
                        >
                            Reservar Otro Turno
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-barberia-gray rounded-lg p-8">
                    <h1 className="text-4xl font-bold text-barberia-gold mb-2 text-center">
                        Reservar Turno
                    </h1>
                    <p className="text-gray-400 text-center mb-8">
                        Completa el formulario para reservar tu turno
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Fecha y Hora */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="dia" className="block text-sm font-medium text-gray-300 mb-2">
                                    Fecha *
                                </label>
                                <input
                                    type="date"
                                    id="dia"
                                    name="dia"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    value={formData.dia}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                />
                            </div>

                            <div>
                                <label htmlFor="hora" className="block text-sm font-medium text-gray-300 mb-2">
                                    Hora *
                                </label>
                                <select
                                    id="hora"
                                    name="hora"
                                    required
                                    value={formData.hora}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                >
                                    <option value="">Seleccionar hora</option>
                                    {generarHorarios().map(h => (
                                        <option key={h} value={h}>{h}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Datos personales */}
                        <div>
                            <label htmlFor="nom" className="block text-sm font-medium text-gray-300 mb-2">
                                Nombre Completo *
                            </label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                required
                                value={formData.nom}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                placeholder="Juan Pérez"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="tel" className="block text-sm font-medium text-gray-300 mb-2">
                                    Teléfono *
                                </label>
                                <input
                                    type="tel"
                                    id="tel"
                                    name="tel"
                                    required
                                    value={formData.tel}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                    placeholder="099123456"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                    placeholder="ejemplo@mail.com"
                                />
                            </div>
                        </div>

                        {/* Servicio */}
                        <div>
                            <label htmlFor="servicio_id" className="block text-sm font-medium text-gray-300 mb-2">
                                Servicio *
                            </label>
                            <select
                                id="servicio_id"
                                name="servicio_id"
                                required
                                value={formData.servicio_id}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                            >
                                <option value="">Seleccionar servicio</option>
                                {servicios.map(servicio => (
                                    <option key={servicio.id} value={servicio.id}>
                                        {servicio.nombre} - ${servicio.precio_base} ({servicio.duracion_minutos} min)
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Nota */}
                        <div>
                            <label htmlFor="nota" className="block text-sm font-medium text-gray-300 mb-2">
                                Nota (opcional)
                            </label>
                            <textarea
                                id="nota"
                                name="nota"
                                rows="3"
                                value={formData.nota}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                placeholder="Alguna preferencia o comentario especial..."
                            />
                        </div>

                        {/* Checkbox opcional */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="opcional"
                                name="opcional"
                                checked={formData.opcional}
                                onChange={handleChange}
                                className="w-4 h-4 text-barberia-gold bg-barberia-dark border-gray-600 rounded focus:ring-barberia-gold"
                            />
                            <label htmlFor="opcional" className="ml-2 text-sm text-gray-300">
                                Marcar este turno como opcional (turno flexible)
                            </label>
                        </div>

                        {/* Botón de envío */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full py-4 rounded-md font-bold text-lg transition-colors ${submitting
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-barberia-gold text-barberia-dark hover:bg-yellow-500'
                                }`}
                        >
                            {submitting ? 'Reservando...' : 'Confirmar Reserva'}
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 text-center mt-6">
                        * Campos obligatorios
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReservarTurno