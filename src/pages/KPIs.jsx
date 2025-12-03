import React from 'react'
import { Target, TrendingUp, Users, Building, Euro, Award } from 'lucide-react'
import { extremaduraData2024 } from '../data/extremaduraData'

const KPIs = () => {
  const kpis = [
    {
      title: 'Población Activa',
      value: extremaduraData2024.kpis.poblacion_activa.toLocaleString(),
      target: 530000,
      unit: 'personas',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Empleos Creados',
      value: extremaduraData2024.kpis.empleos_creados_2024,
      target: 10000,
      unit: 'empleos',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Tasa de Colocación',
      value: `${extremaduraData2024.kpis.tasa_colocacion}%`,
      target: '90%',
      unit: 'porcentaje',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Empresas Registradas',
      value: extremaduraData2024.kpis.empresas_inscritas.toLocaleString(),
      target: 95000,
      unit: 'empresas',
      icon: Building,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Afiliados Medios',
      value: extremaduraData2024.kpis.afiliados_medios.toLocaleString(),
      target: 450000,
      unit: 'afiliados',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Inversión Pública',
      value: `${(extremaduraData2024.kpis.licitaciones_publicas / 1000000).toFixed(0)}M`,
      target: '150M',
      unit: 'euros',
      icon: Euro,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Inversión Extranjera',
      value: `${(extremaduraData2024.kpis.inversion_extranjera / 1000000).toFixed(0)}M`,
      target: '300M',
      unit: 'euros',
      icon: Euro,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      title: 'Duración Búsqueda',
      value: `${extremaduraData2024.kpis.duracion_media_busqueda}mes`,
      target: '8mes',
      unit: 'meses',
      icon: Award,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ]

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">KPIs Principales</h2>
        <p className="text-gray-600">Indicadores clave de rendimiento 2024</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 gap-4">
        {kpis.map((kpi, index) => {
          const IconComponent = kpi.icon
          const targetNumber = typeof kpi.target === 'string' ? parseInt(kpi.target.replace(/[^\d]/g, '')) : kpi.target
          const currentNumber = typeof kpi.value === 'string' ? parseInt(kpi.value.replace(/[^\d]/g, '')) : kpi.value
          const progress = targetNumber > 0 ? Math.min((currentNumber / targetNumber) * 100, 100) : 0
          const isOnTarget = progress >= 90
          
          return (
            <div key={index} className="mobile-card">
              <div className="flex items-start space-x-4">
                <div className={`${kpi.bgColor} rounded-lg p-3 flex-shrink-0`}>
                  <IconComponent className={`w-6 h-6 ${kpi.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{kpi.title}</h3>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      isOnTarget ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {progress.toFixed(0)}%
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                      <span className="text-sm text-gray-500">{kpi.unit}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Objetivo: {kpi.target}</span>
                      <span className={isOnTarget ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>
                        {isOnTarget ? 'En objetivo' : 'Pendiente'}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isOnTarget ? 'bg-green-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Resumen ejecutivo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Resumen Ejecutivo</h3>
        <p className="text-sm text-blue-700">
          Extremadura muestra un desempeño sólido en la mayoría de KPIs, con la población activa 
          alcanzando el <span className="font-semibold">98.8%</span> del objetivo anual. 
          La inversión extranjera supera expectativas con <span className="font-semibold">235M€</span> 
          comprometidos.
        </p>
      </div>

      {/* Alertas y acciones */}
      <div className="mobile-card">
        <h3 className="mobile-card-title mb-4">Acciones Recomendadas</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-orange-800">Duración de búsqueda</p>
              <p className="text-xs text-orange-700">Implementar programas de inserción laboral acelerada</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-green-800">Inversión extranjera</p>
              <p className="text-xs text-green-700">Mantener momentum y ampliar facilidades</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-blue-800">Creación de empleo</p>
              <p className="text-xs text-blue-700">Acelerar el ritmo para alcanzar el objetivo anual</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KPIs