import React, { useState } from 'react'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import AgendaTable from '../components/AgendaTable'
import ServiciosList from '../components/admin/ServiciosList'
import FondosList from '../components/admin/FondosList'
import ReportesIngresos from '../components/admin/ReportesIngresos'

function AdminDashboard() {
    const location = useLocation()

    const tabs = [
        { id: 'agenda', name: 'Agenda', path: '/admin/dashboard' },
        { id: 'servicios', name: 'Servicios', path: '/admin/dashboard/servicios' },
        { id: 'fondos', name: 'Carrusel', path: '/admin/dashboard/fondos' },
        { id: 'reportes', name: 'Reportes', path: '/admin/dashboard/reportes' }
    ]

    // Determinar la pestaña activa basándose en la ruta actual
    const getActiveTab = () => {
        const currentPath = location.pathname
        if (currentPath === '/admin/dashboard') return 'agenda'
        if (currentPath.includes('servicios')) return 'servicios'
        if (currentPath.includes('fondos')) return 'fondos'
        if (currentPath.includes('reportes')) return 'reportes'
        return 'agenda'
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header del Dashboard */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-barberia-gold mb-2">
                        Panel de Administración
                    </h1>
                    <p className="text-gray-400">
                        Gestiona tu barbería desde un solo lugar
                    </p>
                </div>

                {/* Tabs de navegación */}
                <div className="bg-barberia-gray rounded-lg mb-8">
                    <nav className="flex flex-wrap">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.id}
                                to={tab.path}
                                className={`px-6 py-4 font-semibold transition-colors ${getActiveTab() === tab.id
                                    ? 'text-barberia-gold border-b-2 border-barberia-gold'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Contenido de las pestañas */}
                <div className="bg-barberia-dark rounded-lg p-6">
                    <Routes>
                        <Route index element={<AgendaTable />} />
                        <Route path="servicios" element={<ServiciosList />} />
                        <Route path="fondos" element={<FondosList />} />
                        <Route path="reportes" element={<ReportesIngresos />} />
                        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard