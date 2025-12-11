import React from 'react'

function LoadingSpinner({ message = 'Cargando...' }) {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-barberia-gold"></div>
            <p className="mt-4 text-gray-400">{message}</p>
        </div>
    )
}

export default LoadingSpinner