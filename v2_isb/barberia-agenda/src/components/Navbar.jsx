import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiUser, FiLogOut } from 'react-icons/fi'

function Navbar() {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        setIsMenuOpen(false)
        navigate('/')
    }

    const closeMenu = () => setIsMenuOpen(false)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <nav className="bg-barberia-gray shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center">
                        <span className="text-base sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap">
                            IAN SALADA BARBER
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/"
                            className="text-gray-300 hover:text-barberia-gold transition-colors px-3 py-2"
                        >
                            Inicio
                        </Link>

                        <Link
                            to="/reservar"
                            className="bg-white text-black px-5 py-2 rounded-md font-semibold hover:bg-black hover:text-white transition-colors"
                        >
                            Reservar Turno
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/admin/dashboard"
                                    className="text-gray-300 hover:text-barberia-gold transition-colors px-3 py-2"
                                >
                                    Administración
                                </Link>

                                {/* Icono logout (desktop) */}
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-300 hover:text-red-400 transition-colors p-2 rounded-md"
                                    aria-label="Cerrar sesión"
                                    title="Cerrar sesión"
                                >
                                    <FiLogOut className="w-6 h-6" />
                                </button>
                            </>
                        ) : (
                            /* Icono login (desktop) */
                            <Link
                                to="/admin/login"
                                className="text-gray-300 hover:text-barberia-gold transition-colors p-2 rounded-md"
                                aria-label="Iniciar sesión"
                                title="Iniciar sesión"
                            >
                                <FiUser className="w-6 h-6" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-300 hover:text-barberia-gold focus:outline-none focus:text-barberia-gold p-2"
                        aria-label="Abrir menú de navegación"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-barberia-gray border-t border-gray-700">
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="block text-gray-300 hover:text-barberia-gold hover:bg-gray-800 transition-colors px-3 py-2 rounded-md"
                    >
                        Inicio
                    </Link>

                    <Link
                        to="/reservar"
                        onClick={closeMenu}
                        className="block text-gray-300 hover:text-barberia-gold hover:bg-gray-800 transition-colors px-3 py-2 rounded-md"
                    >
                        Reservar Turno
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/admin/dashboard"
                                onClick={closeMenu}
                                className="block text-gray-300 hover:text-barberia-gold hover:bg-gray-800 transition-colors px-3 py-2 rounded-md"
                            >
                                Administración
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="w-full text-left text-gray-300 hover:text-red-400 hover:bg-gray-800 transition-colors px-3 py-2 rounded-md"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/admin/login"
                            onClick={closeMenu}
                            className="block text-gray-300 hover:text-barberia-gold hover:bg-gray-800 transition-colors px-3 py-2 rounded-md"
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar