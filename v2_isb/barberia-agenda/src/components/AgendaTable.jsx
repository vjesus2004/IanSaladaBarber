import React, { useState, useEffect } from 'react'
import { getTurnos, updateEstadoTurno } from '../api/agendaApi'
import LoadingSpinner from './LoadingSpinner'

function AgendaTable() {
    const [turnos, setTurnos] = useState([])
    const [loading, setLoading] = useState(true)
    const [filtros, setFiltros] = useState({
        fechaDesde: '',
        fechaHasta: '',
        estado: '',
        servicio: ''
    })

    useEffect(() => {
        cargarTurnos()
    }, [])

    const cargarTurnos = async () => {
        setLoading(true)
        try {
            const data = await getTurnos(filtros)
            setTurnos(data)
        } catch (error) {
            console.error('Error al cargar turnos:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCambiarEstado = async (id, nuevoEstado) => {
        try {
            await updateEstadoTurno(id, nuevoEstado)
            // Actualizar el turno en el estado local
            setTurnos(turnos.map(t =>
                t.ID === id ? { ...t, estado: nuevoEstado } : t
            ))
            alert('Estado actualizado correctamente')
        } catch (error) {
            console.error('Error al actualizar estado:', error)
            alert('Error al actualizar el estado')
        }
    }

    const handleFiltrar = (e) => {
        e.preventDefault()
        cargarTurnos()
    }

    const getEstadoColor = (estado) => {
        const colores = {
            'pendiente': 'bg-yellow-500',
            'confirmada': 'bg-blue-500',
            'completada': 'bg-green-500',
            'cancelada': 'bg-red-500',
            'no_asistio': 'bg-gray-500'
        }
        return colores[estado] || 'bg-gray-500'
    }

    if (loading) return <LoadingSpinner message="Cargando agenda..." />

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-barberia-gold">Agenda de Turnos</h2>

            {/* Filtros */}
            <form onSubmit={handleFiltrar} className="bg-barberia-gray p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Fecha Desde
                        </label>
                        <input
                            type="date"
                            value={filtros.fechaDesde}
                            onChange={(e) => setFiltros({ ...filtros, fechaDesde: e.target.value })}
                            className="w-full px-3 py-2 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Fecha Hasta
                        </label>
                        <input
                            type="date"
                            value={filtros.fechaHasta}
                            onChange={(e) => setFiltros({ ...filtros, fechaHasta: e.target.value })}
                            className="w-full px-3 py-2 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Estado
                        </label>
                        <select
                            value={filtros.estado}
                            onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                            className="w-full px-3 py-2 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                        >
                            <option value="">Todos</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="confirmada">Confirmada</option>
                            <option value="completada">Completada</option>
                            <option value="cancelada">Cancelada</option>
                            <option value="no_asistio">No asistió</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="w-full bg-barberia-gold text-barberia-dark px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
                        >
                            Filtrar
                        </button>
                    </div>
                </div>
            </form>

            {/* Tabla de turnos */}
            <div className="bg-barberia-gray rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-barberia-dark">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Fecha
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Hora
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Cliente
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Teléfono
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Servicio
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Precio
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {turnos.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-4 text-center text-gray-400">
                                        No hay turnos para mostrar
                                    </td>
                                </tr>
                            ) : (
                                turnos.map((turno) => (
                                    <tr key={turno.ID} className="hover:bg-barberia-dark transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {turno.dia}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {turno.hora}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {turno.nom}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {turno.tel}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {turno.nombre_servicio}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            ${turno.precio}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(turno.estado)} text-white`}>
                                                {turno.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <select
                                                value={turno.estado}
                                                onChange={(e) => handleCambiarEstado(turno.ID, e.target.value)}
                                                className="bg-barberia-dark border border-gray-600 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-barberia-gold"
                                            >
                                                <option value="pendiente">Pendiente</option>
                                                <option value="confirmada">Confirmada</option>
                                                <option value="completada">Completada</option>
                                                <option value="cancelada">Cancelada</option>
                                                <option value="no_asistio">No asistió</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AgendaTable