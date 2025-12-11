import React, { useState, useEffect } from 'react'
import { getFondos, createFondo, updateFondo, deleteFondo } from '../../api/fondoApi'
import LoadingSpinner from '../LoadingSpinner'

function FondosList() {
    const [fondos, setFondos] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingFondo, setEditingFondo] = useState(null)
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        url_imagen: '',
        orden: 0,
        activo: true
    })

    useEffect(() => {
        cargarFondos()
    }, [])

    const cargarFondos = async () => {
        setLoading(true)
        try {
            const data = await getFondos()
            setFondos(data)
        } catch (error) {
            console.error('Error al cargar fondos:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingFondo) {
                await updateFondo(editingFondo.id, formData)
                alert('Fondo actualizado correctamente')
            } else {
                await createFondo(formData)
                alert('Fondo creado correctamente')
            }
            setShowModal(false)
            resetForm()
            cargarFondos()
        } catch (error) {
            console.error('Error al guardar fondo:', error)
            alert('Error al guardar el fondo')
        }
    }

    const handleEdit = (fondo) => {
        setEditingFondo(fondo)
        setFormData({
            titulo: fondo.titulo || '',
            descripcion: fondo.descripcion || '',
            url_imagen: fondo.url_imagen,
            orden: fondo.orden,
            activo: fondo.activo
        })
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este fondo?')) {
            try {
                await deleteFondo(id)
                alert('Fondo eliminado correctamente')
                cargarFondos()
            } catch (error) {
                console.error('Error al eliminar fondo:', error)
                alert('Error al eliminar el fondo')
            }
        }
    }

    const resetForm = () => {
        setFormData({
            titulo: '',
            descripcion: '',
            url_imagen: '',
            orden: 0,
            activo: true
        })
        setEditingFondo(null)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        resetForm()
    }

    if (loading) return <LoadingSpinner message="Cargando fondos..." />

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-barberia-gold">Gestión de Carrusel</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-barberia-gold text-barberia-dark px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
                >
                    Nuevo Fondo
                </button>
            </div>

            {/* Lista de fondos */}
            <div className="bg-barberia-gray rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-barberia-dark">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                Orden
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                Título
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                Descripción
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                Imagen
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {fondos.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                                    No hay fondos configurados
                                </td>
                            </tr>
                        ) : (
                            fondos.map((fondo) => (
                                <tr key={fondo.id} className="hover:bg-barberia-dark transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {fondo.orden}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {fondo.titulo}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {fondo.descripcion}
                                    </td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={fondo.url_imagen}
                                            alt={fondo.titulo}
                                            className="w-20 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded ${fondo.activo ? 'bg-green-500' : 'bg-red-500'
                                            } text-white`}>
                                            {fondo.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(fondo)}
                                                className="text-blue-400 hover:text-blue-300"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(fondo.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de formulario */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-barberia-gray rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold text-barberia-gold mb-6">
                            {editingFondo ? 'Editar Fondo' : 'Nuevo Fondo'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    value={formData.titulo}
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
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
                                    URL de Imagen *
                                </label>
                                <input
                                    type="url"
                                    required
                                    value={formData.url_imagen}
                                    onChange={(e) => setFormData({ ...formData, url_imagen: e.target.value })}
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    className="w-full px-3 py-2 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Orden *
                                </label>
                                <input
                                    type="number"
                                    required
                                    value={formData.orden}
                                    onChange={(e) => setFormData({ ...formData, orden: e.target.value })}
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
                                    Fondo activo
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
                                    {editingFondo ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FondosList