import React, { useState, useEffect } from 'react'

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
        <div className="relative w-full h-96 overflow-hidden">
            {/* Imagen de fondo */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${currentFondo.url_imagen})`,
                }}
            >
                {/* Contenido superpuesto */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                        {currentFondo.titulo}
                    </h2>
                    <p className="text-lg md:text-xl text-center max-w-2xl">
                        {currentFondo.descripcion}
                    </p>
                </div>
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {fondos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                ? 'bg-barberia-gold w-8'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Botones de navegación */}
            <button
                onClick={() => setCurrentIndex(currentIndex === 0 ? fondos.length - 1 : currentIndex - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                aria-label="Anterior"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={() => setCurrentIndex(currentIndex === fondos.length - 1 ? 0 : currentIndex + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
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