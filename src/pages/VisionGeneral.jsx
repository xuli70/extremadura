import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, Users, Briefcase, Heart, Award, AlertTriangle, CheckCircle } from 'lucide-react'
import { extremaduraData2024, historicoData, datosProvinciales } from '../data/extremaduraData'

// Colores para los gráficos
const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

const VisionGeneral = () => {
  const [selectedMetric, setSelectedMetric] = useState('poblacion')
  const [timeRange, setTimeRange] = useState('5years')

  // Métricas principales en tiempo real
  const mainMetrics = [
    {
      title: 'Población Activa',
      value: extremaduraData2024.kpis.poblacion_activa.toLocaleString(),
      change: '+1.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'personas en edad laboral'
    },
    {
      title: 'Tasa de Empleo',
      value: `${extremaduraData2024.poblacion.tasas.empleo}%`,
      change: '+0.8%',
      trend: 'up',
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'de la población activa'
    },
    {
      title: 'Tasa de Paro',
      value: `${extremaduraData2024.poblacion.tasas.paro}%`,
      change: '-0.3%',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'por debajo de la media nacional'
    },
    {
      title: 'Pensión Promedio',
      value: `${extremaduraData2024.jubilacion.pension_promedio.toFixed(2)}€`,
      change: '+1.4%',
      trend: 'up',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'euros mensuales'
    }
  ]

  // Datos para gráficos
  const actividadHistorica = historicoData.poblacion_activa.map(item => ({
    ...item,
    year: item.year,
    value: item.value / 1000 // Convertir a miles
  }))

  const paroHistorico = historicoData.tasa_paro.map(item => ({
    ...item,
    year: item.year,
    value: Number(item.value)
  }))

  const sectoresData = Object.entries(extremaduraData2024.sectores).map(([sector, data]) => ({
    name: sector.charAt(0).toUpperCase() + sector.slice(1),
    empleados: data.empleados,
    porcentaje: data.porcentaje,
    variacion: data.variacion
  }))

  const edadData = Object.entries(extremaduraData2024.demografiaEdad).map(([edad, data]) => ({
    edad: edad,
    empleados: data.empleado,
    paro: data.paro,
    tasa: data.tasas.paro
  }))

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header de la página */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Visión General</h2>
        <p className="text-gray-600">Resumen ejecutivo de Extremadura</p>
        <div className="flex items-center justify-center mt-2 space-x-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600 font-medium">Datos actualizados</span>
          <span className="text-xs text-gray-500">4 dic 2024</span>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 gap-3">
        {mainMetrics.map((metric, index) => {
          const IconComponent = metric.icon
          const isPositive = metric.trend === 'up'
          
          return (
            <div key={index} className="mobile-card">
              <div className={`${metric.bgColor} rounded-lg p-3 mb-3`}>
                <IconComponent className={`w-6 h-6 ${metric.color}`} />
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{metric.title}</p>
                <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-xs text-gray-600">{metric.description}</p>
                
                <div className="flex items-center space-x-1">
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-green-500" />
                  )}
                  <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-green-600'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Alerta importante */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-amber-800">Indicador de Atención</h3>
            <p className="text-sm text-amber-700 mt-1">
              El desempleo de larga duración afecta al 24.8% de los desempleados (15,678 personas).
              Se recomienda reforzar los programas de inserción laboral.
            </p>
          </div>
        </div>
      </div>

      {/* Evolución de la población activa */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Evolución Población Activa</h3>
          <div className="flex space-x-1">
            <button
              onClick={() => setTimeRange('5years')}
              className={`px-2 py-1 text-xs rounded ${timeRange === '5years' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}
            >
              5A
            </button>
            <button
              onClick={() => setTimeRange('3years')}
              className={`px-2 py-1 text-xs rounded ${timeRange === '3years' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}
            >
              3A
            </button>
          </div>
        </div>
        
        <div className="mobile-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={actividadHistorica}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0ea5e9" 
                strokeWidth={3}
                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Evolución de la tasa de paro */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Tendencia de Desempleo</h3>
          <span className="text-xs text-green-600 font-medium">Tendencia decreciente</span>
        </div>
        
        <div className="mobile-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={paroHistorico}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribución por sectores */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Empleo por Sectores</h3>
          <span className="text-xs text-gray-500">Total empleados</span>
        </div>
        
        <div className="mobile-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectoresData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Bar dataKey="empleados" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2">
          {sectoresData.map((sector, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm font-medium text-gray-700">{sector.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{sector.empleados.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{sector.porcentaje}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparación provincial */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Comparación Provincial</h3>
          <span className="text-xs text-gray-500">Tasa de actividad</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(datosProvinciales).map(([provincia, data]) => (
            <div key={provincia} className="bg-gray-50 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 capitalize">
                {provincia.replace('_', ' ')}
              </h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Población</p>
                  <p className="text-sm font-semibold">{data.poblacion.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tasa Actividad</p>
                  <p className="text-sm font-semibold text-primary-600">{data.tasa_actividad}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tasa Paro</p>
                  <p className="text-sm font-semibold text-red-600">{data.tasa_paro}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de salud laboral */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Salud Laboral</h3>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-xs text-red-600 font-medium">Monitoreo activo</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{extremaduraData2024.saludLaboral.accidentes_trabajo}</p>
            <p className="text-xs text-gray-500">Accidentes trabajo</p>
            <p className="text-xs text-green-600 font-medium mt-1">-5.2% vs 2023</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{extremaduraData2024.saludLaboral.tasa_absentismo}%</p>
            <p className="text-xs text-gray-500">Tasa absentismo</p>
            <p className="text-xs text-green-600 font-medium mt-1">-0.3% vs 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisionGeneral