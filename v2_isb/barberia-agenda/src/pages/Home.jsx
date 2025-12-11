import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carrusel from '../components/Carrusel'
import { getFondos } from '../api/fondoApi'
import LoadingSpinner from '../components/LoadingSpinner'

function Home() {
    const [fondos, setFondos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        cargarFondos()
    }, [])

    const cargarFondos = async () => {
        try {
            const data = await getFondos()
            // Filtrar solo los fondos activos y ordenarlos
            const fondosActivos = data
                .filter(f => f.activo)
                .sort((a, b) => a.orden - b.orden)
            setFondos(fondosActivos)
        } catch (error) {
            console.error('Error al cargar fondos:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <LoadingSpinner message="Cargando página..." />
    }

    return (
        <div className="min-h-screen">
            {/* Carrusel */}
            <Carrusel fondos={fondos} />

            {/* Sección de bienvenida */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Bienvenido a <span className="text-barberia-gold">Ian's Barbería</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Expertos en cortes clásicos y modernos. Más de 10 años brindando el mejor servicio
                        y estilo para cada cliente.
                    </p>
                </div>

                {/* Botón de reserva destacado */}
                <div className="text-center mb-16">
                    <Link
                        to="/reservar"
                        className="inline-block bg-barberia-gold text-barberia-dark px-8 py-4 rounded-lg text-xl font-bold hover:bg-yellow-500 transition-colors transform hover:scale-105"
                    >
                        Reservar Turno Ahora
                    </Link>
                </div>

                {/* Características */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-barberia-gray rounded-lg p-8 text-center">
                        <div className="text-barberia-gold text-5xl mb-4">✂️</div>
                        <h3 className="text-xl font-bold text-white mb-2">Cortes Profesionales</h3>
                        <p className="text-gray-400">
                            Barberos expertos en todos los estilos, desde clásicos hasta modernos
                        </p>
                    </div>

                    <div className="bg-barberia-gray rounded-lg p-8 text-center">
                        <div className="text-barberia-gold text-5xl mb-4">⏰</div>
                        <h3 className="text-xl font-bold text-white mb-2">Turnos Online</h3>
                        <p className="text-gray-400">
                            Reserva tu turno fácilmente desde cualquier dispositivo
                        </p>
                    </div>

                    <div className="bg-barberia-gray rounded-lg p-8 text-center">
                        <div className="text-barberia-gold text-5xl mb-4">⭐</div>
                        <h3 className="text-xl font-bold text-white mb-2">Calidad Premium</h3>
                        <p className="text-gray-400">
                            Productos de primera calidad para el cuidado de tu cabello y barba
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección de horarios */}
            <section className="bg-barberia-gray py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-barberia-gold text-center mb-8">
                        Horarios de Atención
                    </h2>
                    <div className="max-w-md mx-auto bg-barberia-dark rounded-lg p-6">
                        <div className="space-y-3 text-white">
                            <div className="flex justify-between">
                                <span>Lunes a Viernes:</span>
                                <span className="font-bold">9:00 - 20:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sábados:</span>
                                <span className="font-bold">9:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Domingos:</span>
                                <span className="font-bold">Cerrado</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-barberia-dark py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
                    <p>&copy; 2025 Ian's Barbería. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    )
}

export default Home