import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTurno } from '../api/agendaApi'
import { getServicios } from '../api/servicioApi'
import LoadingSpinner from '../components/LoadingSpinner'
import CalendarPicker from '../components/CalendarPicker'

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

    const formatFechaLarga = (isoDate) => {
        if (!isoDate) return ''
        const meses = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ]
        const d = new Date(`${isoDate}T00:00:00`)
        return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`
    }

    useEffect(() => {
        cargarServicios()
    }, [])

    const cargarServicios = async () => {
        try {
            const data = await getServicios()
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

    const handleSelectHora = (hora) => {
        setFormData(prev => ({ ...prev, hora }))
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

    // Memo para no recalcular en cada render
    const horarios = useMemo(() => generarHorarios(), [])

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
                    <h1 className="text-4xl font-bold text-white mb-2 text-center">
                        Reservar Turno
                    </h1>
                    <p className="text-gray-400 text-center mb-8">
                        Completa el formulario para reservar tu turno
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Fecha + Horarios */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Fecha */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Fecha *
                                </label>

                                <CalendarPicker
                                    value={formData.dia}
                                    minDateISO={new Date().toISOString().split("T")[0]}
                                    onChange={(iso) => setFormData(prev => ({ ...prev, dia: iso, hora: "" }))}
                                />

                                {formData.dia && (
                                    <p className="text-sm text-gray-400 mt-2">
                                        Seleccionaste:{' '}
                                        <span className="text-white font-semibold">
                                            {formatFechaLarga(formData.dia)}
                                        </span>
                                    </p>
                                )}
                            </div>

                            {/* Horarios a la vista */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Horarios *
                                    </label>

                                    {formData.hora && (
                                        <span className="text-xs px-3 py-1 rounded-full bg-barberia-dark border border-gray-600 text-gray-200">
                                            Hora: <span className="text-white font-semibold">{formData.hora}</span>
                                        </span>
                                    )}
                                </div>

                                {!formData.dia ? (
                                    <div className="h-full flex items-center justify-center rounded-md border border-gray-600 bg-barberia-dark p-6 text-center">
                                        <p className="text-gray-400 text-sm">
                                            Elegí una fecha para ver los horarios disponibles.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="rounded-md border border-gray-600 bg-barberia-dark p-4">
                                        <p className="text-xs text-gray-400 mb-3">
                                            Tocá un horario para seleccionarlo.
                                        </p>

                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                            {horarios.map((h) => {
                                                const selected = formData.hora === h
                                                return (
                                                    <button
                                                        key={h}
                                                        type="button"
                                                        onClick={() => handleSelectHora(h)}
                                                        className={[
                                                            "py-2 rounded-md text-sm font-semibold transition-colors border",
                                                            selected
                                                                ? "bg-barberia-gold text-barberia-dark border-barberia-gold"
                                                                : "bg-barberia-gray text-white border-gray-600 hover:border-barberia-gold"
                                                        ].join(" ")}
                                                    >
                                                        {h}
                                                    </button>
                                                )
                                            })}
                                        </div>

                                        {/* Select oculto para que el form siga teniendo un input "hora" required si querés */}
                                        <select
                                            name="hora"
                                            required
                                            value={formData.hora}
                                            onChange={handleChange}
                                            className="hidden"
                                        >
                                            <option value=""></option>
                                            {horarios.map(h => (
                                                <option key={h} value={h}>{h}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
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

                        {/* Botón de envío */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full py-4 rounded-md font-bold text-lg transition-colors ${submitting
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-barberia-dark hover:text-white hover:bg-black'
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
