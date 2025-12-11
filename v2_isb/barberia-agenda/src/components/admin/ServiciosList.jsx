import React, { useState, useEffect } from 'react'
import { getServicios, createServicio, updateServicio, toggleServicioActivo } from '../../api/servicioApi'
import LoadingSpinner from '../LoadingSpinner'

function ServiciosList() {
    const [servicios, setServicios] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingServicio, setEditingServicio] = useState(null)
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio_base: '',
        duracion_minutos: '',
        activo: true
    })

    useEffect(() => {
        cargarServicios()
    }, [])

    const cargarServicios = async () => {
        setLoading(true)
        try {
            const data = await getServicios()
            setServicios(data)
        } catch (error) {
            console.error('Error al cargar servicios:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingServicio) {
                await updateServicio(editingServicio.id, formData)
                alert('Servicio actualizado correctamente')
            } else {
                await createServicio(formData)
                alert('Servicio creado correctamente')
            }
            setShowModal(false)
            resetForm()
            cargarServicios()
        } catch (error) {
            console.error('Error al guardar servicio:', error)
            alert('Error al guardar el servicio')
        }
    }

    const handleEdit = (servicio) => {
        setEditingServicio(servicio)
        setFormData({
            nombre: servicio.nombre,
            descripcion: servicio.descripcion || '',
            precio_base: servicio.precio_base,
            duracion_minutos: servicio.duracion_minutos,
            activo: servicio.activo
        })
        setShowModal(true)
    }

    const handleToggleActivo = async (id, estadoActual) => {
        try {
            await toggleServicioActivo(id, !estadoActual)
            cargarServicios()
        } catch (error) {
            console.error('Error al cambiar estado:', error)
            alert('Error al cambiar el estado del servicio')
        }
    }

    const resetForm = () => {
        setFormData({
            nombre: '',
            descripcion: '',
            precio_base: '',
            duracion_minutos: '',
            activo: true
        })
        setEditingServicio(null)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        resetForm()
    }

    if (loading) return <LoadingSpinner message="Cargando servicios..." />

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-barberia-gold">Gestión de Servicios</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-barberia-gold text-barberia-dark px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
                >
                    Nuevo Servicio
                </button>
            </div>

            {/* Lista de servicios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicios.map((servicio) => (
                    <div
                        key={servicio.id}
                        className={`bg-barberia-gray rounded-lg p-6 ${!servicio.activo ? 'opacity-60' : ''
                            }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white">{servicio.nombre}</h3>
                            <span className={`px-2 py-1 text-xs rounded ${servicio.activo ? 'bg-green-500' : 'bg-red-500'
                                } text-white`}>
                                {servicio.activo ? 'Activo' : 'Inactivo'}
                            </span>
                        </div>

                        <p className="text-gray-400 text-sm mb-4">{servicio.descripcion}</p>

                        <div className="space-y-2 mb-4">
                            <p className="text-barberia-gold font-bold text-2xl">
                                ${servicio.precio_base}
                            </p>
                            <p className="text-gray-400 text-sm">
                                Duración: {servicio.duracion_minutos} minutos
                            </p>
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleEdit(servicio)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleToggleActivo(servicio.id, servicio.activo)}
                                className={`flex-1 ${servicio.activo
                                        ? 'bg-red-600 hover:bg-red-700'
                                        : 'bg-green-600 hover:bg-green-700'
                                    } text-white px-4 py-2 rounded-md text-sm transition-colors`}
                            >
                                {servicio.activo ? 'Desactivar' : 'Activar'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de formulario */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-barberia-gray rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-2xl font-bold text-barberia-gold mb-6">
                            {editingServicio ? 'Editar Servicio' : 'Nuevo Servicio'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    className="w-full px-3 py-2 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Descripción
                                </label>
                                <textarea
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    rows="3"
                                    className="w-full px-3 py-2 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Precio Base *
                                </label>
                                <input
                                    type="number"
                                    required
                                    step="0.01"
                                    value={formData.precio_base}
                                    onChange={(e) => setFormData({ ...formData, precio_base: e.target.value })}
                                    className="w-full px-3 py-2 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Duración (minutos) *
                                </label>
                                <input
                                    type="number"
                                    required
                                    value={formData.duracion_minutos}
                                    onChange={(e) => setFormData({ ...formData, duracion_minutos: e.target.value })}
                                    className="w-full px-3 py-2 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="activo"
                                    checked={formData.activo}
                                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                                    className="w-4 h-4 text-barberia-gold bg-barberia-dark border-gray-600 rounded focus:ring-barberia-gold"
                                />
                                <label htmlFor="activo" className="ml-2 text-sm text-gray-300">
                                    Servicio activo
                                </label>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-semibold transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-barberia-gold text-barberia-dark px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
                                >
                                    {editingServicio ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ServiciosList