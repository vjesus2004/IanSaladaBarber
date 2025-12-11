import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <nav className="bg-barberia-gray shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center">
                        <span className="text-2xl font-bold text-barberia-gold">Ian's Barbería</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className="text-gray-300 hover:text-barberia-gold transition-colors px-3 py-2"
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/reservar"
                            className="bg-barberia-gold text-barberia-dark px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
                        >
                            Reservar Turno
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/admin/dashboard"
                                    className="text-gray-300 hover:text-barberia-gold transition-colors px-3 py-2"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-300 hover:text-red-400 transition-colors px-3 py-2"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/admin/login"
                                className="text-gray-300 hover:text-barberia-gold transition-colors px-3 py-2"
                            >
                                Admin
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar