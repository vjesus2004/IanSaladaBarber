import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Carrusel({ fondos }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (fondos.length === 0) return

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === fondos.length - 1 ? 0 : prevIndex + 1
            )
        }, 5000)

        return () => clearInterval(interval)
    }, [fondos.length])

    if (fondos.length === 0) {
        return (
            <div className="w-full h-96 bg-barberia-gray flex items-center justify-center">
                <p className="text-gray-400">No hay imágenes disponibles</p>
            </div>
        )
    }

    const currentFondo = fondos[currentIndex]

    return (
        <div className="relative w-full h-[520px] md:h-[600px] overflow-hidden rounded-2xl">
            {/* Imagen de fondo (solo cambia esto) */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{
                    backgroundImage: `url(${currentFondo.url_imagen})`,
                }}
            />

            {/* Overlay oscuro para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

            {/* Contenido FIJO (no cambia de lugar) */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-center tracking-tight drop-shadow">
                    {currentFondo.titulo}
                </h2>

                <p className="text-base md:text-xl text-center max-w-2xl text-white/90 leading-relaxed">
                    {currentFondo.descripcion}
                </p>

                {/* BOTÓN FIJO */}
                <div className="mt-8">
                    <Link
                        to="/reservar"
                        className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-xl text-lg md:text-xl font-bold
                       shadow-lg shadow-black/30 border border-black/10
                       hover:bg-black hover:text-white hover:scale-105 transition-all duration-200"
                    >
                        Reservar Turno Ahora
                    </Link>
                </div>
            </div>

            {/* Indicadores (abajo, sin chocar con el botón) */}
            <div className="absolute z-10 bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {fondos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${index === currentIndex
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/80 w-2'
                            }`}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Botones de navegación */}
            <button
                onClick={() =>
                    setCurrentIndex(currentIndex === 0 ? fondos.length - 1 : currentIndex - 1)
                }
                className="absolute z-10 left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                aria-label="Anterior"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={() =>
                    setCurrentIndex(currentIndex === fondos.length - 1 ? 0 : currentIndex + 1)
                }
                className="absolute z-10 right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                aria-label="Siguiente"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    )
}

export default Carrusel