import React, { useState, useEffect } from 'react'
import { getIngresos } from '../../api/reportesApi'
import LoadingSpinner from '../LoadingSpinner'

function ReportesIngresos() {
    const [ingresos, setIngresos] = useState(null)
    const [loading, setLoading] = useState(true)
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())

    useEffect(() => {
        cargarIngresos()
    }, [yearSelected])

    const cargarIngresos = async () => {
        setLoading(true)
        try {
            const data = await getIngresos(yearSelected)
            setIngresos(data)
        } catch (error) {
            console.error('Error al cargar ingresos:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <LoadingSpinner message="Cargando reportes..." />

    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-barberia-gold">Reportes de Ingresos</h2>
                <select
                    value={yearSelected}
                    onChange={(e) => setYearSelected(Number(e.target.value))}
                    className="px-4 py-2 bg-barberia-dark border border-gray-600 rounded-md text-white focus:outline-none focus:border-barberia-gold"
                >
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                </select>
            </div>

            {/* Resumen anual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-barberia-gray rounded-lg p-6">
                    <h3 className="text-gray-400 text-sm uppercase mb-2">Total Anual</h3>
                    <p className="text-4xl font-bold text-barberia-gold">
                        ${ingresos?.total_anual.toFixed(2)}
                    </p>
                </div>

                <div className="bg-barberia-gray rounded-lg p-6">
                    <h3 className="text-gray-400 text-sm uppercase mb-2">Turnos Completados</h3>
                    <p className="text-4xl font-bold text-white">
                        {ingresos?.total_turnos}
                    </p>
                </div>

                <div className="bg-barberia-gray rounded-lg p-6">
                    <h3 className="text-gray-400 text-sm uppercase mb-2">Promedio por Turno</h3>
                    <p className="text-4xl font-bold text-white">
                        ${ingresos?.promedio_turno.toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Ingresos mensuales */}
            <div className="bg-barberia-gray rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6">Ingresos Mensuales</h3>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                                    Mes
                                </th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">
                                    Turnos
                                </th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">
                                    Ingresos
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {ingresos?.ingresos_mensuales.map((mes, index) => (
                                <tr key={index} className="hover:bg-barberia-dark transition-colors">
                                    <td className="px-4 py-3 text-sm text-gray-300">
                                        {meses[index]}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-300 text-right">
                                        {mes.cantidad}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-barberia-gold font-semibold text-right">
                                        ${mes.total.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t-2 border-barberia-gold">
                                <td className="px-4 py-3 text-sm font-bold text-white">
                                    TOTAL
                                </td>
                                <td className="px-4 py-3 text-sm font-bold text-white text-right">
                                    {ingresos?.total_turnos}
                                </td>
                                <td className="px-4 py-3 text-sm font-bold text-barberia-gold text-right">
                                    ${ingresos?.total_anual.toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Gráfico visual simple con barras */}
            <div className="bg-barberia-gray rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6">Gráfico Mensual</h3>
                <div className="space-y-2">
                    {ingresos?.ingresos_mensuales.map((mes, index) => {
                        const porcentaje = (mes.total / ingresos.total_anual) * 100
                        return (
                            <div key={index}>
                                <div className="flex justify-between text-sm text-gray-300 mb-1">
                                    <span>{meses[index]}</span>
                                    <span>${mes.total.toFixed(2)}</span>
                                </div>
                                <div className="w-full bg-barberia-dark rounded-full h-3">
                                    <div
                                        className="bg-barberia-gold h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${porcentaje}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ReportesIngresos