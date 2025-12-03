import React, { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Briefcase, TrendingUp, TrendingDown, Users, MapPin, GraduationCap, Clock, AlertCircle } from 'lucide-react'
import { extremaduraData2024, historicoData } from '../data/extremaduraData'

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

const MercadoLaboral = () => {
  const [selectedView, setSelectedView] = useState('general')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all')

  // Datos para gráficos
  const empleoPorEdad = Object.entries(extremaduraData2024.demografiaEdad).map(([edad, data]) => ({
    edad: edad,
    activos: data.activo,
    empleados: data.empleado,
    paro: data.paro,
    inactivos: data.inactivo,
    tasa_actividad: data.tasas.actividad,
    tasa_empleo: data.tasas.empleo,
    tasa_paro: data.tasas.paro
  }))

  const sectoresData = Object.entries(extremaduraData2024.sectores).map(([sector, data]) => ({
    name: sector.charAt(0).toUpperCase() + sector.slice(1),
    empleados: data.empleados,
    porcentaje: data.porcentaje,
    variacion: data.variacion,
    fill: COLORS[Object.keys(extremaduraData2024.sectores).indexOf(sector)]
  }))

  const desempleoEducacion = Object.entries(extremaduraData2024.desempleoEducacion).map(([nivel, data]) => ({
    nivel: nivel.replace('_', ' ').toUpperCase(),
    tasa: data.tasa,
    personas: data.personas,
    fill: COLORS[Object.entries(extremaduraData2024.desempleoEducacion).indexOf([nivel, data])]
  }))

  const evolucionEmpleo = historicoData.poblacion_activa.map((item, index) => ({
    year: item.year,
    empleados: item.value * (extremaduraData2024.poblacion.tasas.empleo / 100),
    paro: item.value * (extremaduraData2024.poblacion.tasas.paro / 100)
  }))

  const mainMetrics = [
    {
      title: 'Empleados',
      value: Math.round(extremaduraData2024.kpis.poblacion_activa * (extremaduraData2024.poblacion.tasas.empleo / 100)).toLocaleString(),
      change: '+2.1%',
      trend: 'up',
      icon: Briefcase,
      color: 'text-blue-600'
    },
    {
      title: 'Desempleados',
      value: Math.round(extremaduraData2024.kpis.poblacion_activa * (extremaduraData2024.poblacion.tasas.paro / 100)).toLocaleString(),
      change: '-8.7%',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-red-600'
    },
    {
      title: 'Tasa Colocación',
      value: `${extremaduraData2024.kpis.tasa_colocacion}%`,
      change: '+1.5%',
      trend: 'up',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Duración Media',
      value: `${extremaduraData2024.kpis.duracion_media_busqueda}mes`,
      change: '-0.8',
      trend: 'down',
      icon: Clock,
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header de la página */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mercado Laboral</h2>
        <p className="text-gray-600">Análisis detallado del empleo en Extremadura</p>
      </div>

      {/* Selector de vista */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        {[
          { key: 'general', label: 'General' },
          { key: 'edad', label: 'Por Edad' },
          { key: 'sector', label: 'Sectores' },
          { key: 'educacion', label: 'Educación' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedView(tab.key)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
              selectedView === tab.key
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 gap-3">
        {mainMetrics.map((metric, index) => {
          const IconComponent = metric.icon
          const isPositive = metric.trend === 'up'
          
          return (
            <div key={index} className="mobile-card">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${metric.color.includes('blue') ? 'bg-blue-50' : 
                  metric.color.includes('red') ? 'bg-red-50' : 
                  metric.color.includes('green') ? 'bg-green-50' : 'bg-purple-50'}`}>
                  <IconComponent className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{metric.title}</p>
                  <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
              
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
          )
        })}
      </div>

      {/* Vista general */}
      {selectedView === 'general' && (
        <>
          <div className="mobile-card">
            <div className="mobile-card-header">
              <h3 className="mobile-card-title">Evolución del Empleo</h3>
              <span className="text-xs text-gray-500">Últimos 5 años</span>
            </div>
            
            <div className="mobile-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolucionEmpleo}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Area 
                    type="monotone" 
                    dataKey="empleados" 
                    stackId="1" 
                    stroke="#0ea5e9" 
                    fill="#0ea5e9" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="paro" 
                    stackId="1" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Desempleo de larga duración */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-orange-800">Desempleo de Larga Duración</h3>
                <p className="text-sm text-orange-700 mt-1">
                  <span className="font-semibold">{extremaduraData2024.desempleoLargaDuracion.total.toLocaleString()} personas</span> 
                  {' '}sin empleo durante más de 12 meses ({extremaduraData2024.desempleoLargaDuracion.porcentaje_desempleo}% del total).
                  Duración promedio: <span className="font-semibold">{extremaduraData2024.desempleoLargaDuracion.meses_promedio} meses</span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Vista por edad */}
      {selectedView === 'edad' && (
        <>
          <div className="mobile-card">
            <div className="mobile-card-header">
              <h3 className="mobile-card-title">Empleo por Tramos de Edad</h3>
              <span className="text-xs text-gray-500">Miles de personas</span>
            </div>
            
            <div className="mobile-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={empleoPorEdad}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="edad" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Bar dataKey="empleados" fill="#0ea5e9" name="Empleados" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="paro" fill="#ef4444" name="Desempleados" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mobile-card">
            <div className="mobile-card-header">
              <h3 className="mobile-card-title">Tasas por Edad</h3>
              <span className="text-xs text-gray-500">% sobre población</span>
            </div>
            
            <div className="space-y-3">
              {empleoPorEdad.map((grupo, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-900">Edad {grupo.edad}</h4>
                    <span className="text-xs text-gray-500">{grupo.activos.toLocaleString()} activos</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Actividad</p>
                      <p className="text-sm font-semibold text-blue-600">{grupo.tasa_actividad}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Empleo</p>
                      <p className="text-sm font-semibold text-green-600">{grupo.tasa_empleo}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Paro</p>
                      <p className={`text-sm font-semibold ${grupo.tasa_paro > 10 ? 'text-red-600' : 'text-green-600'}`}>
                        {grupo.tasa_paro}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Vista por sectores */}
      {selectedView === 'sector' && (
        <>
          <div className="mobile-card">
            <div className="mobile-card-header">
              <h3 className="mobile-card-title">Distribución Sectorial</h3>
              <span className="text-xs text-gray-500">Porcentaje del empleo</span>
            </div>
            
            <div className="mobile-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectoresData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="empleados"
                  >
                    {sectoresData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              {sectoresData.map((sector, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: sector.fill }}
                    />
                    <span className="text-sm font-medium text-gray-700">{sector.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{sector.empleados.toLocaleString()}</p>
                    <div className="flex items-center space-x-1">
                      <p className="text-xs text-gray-500">{sector.porcentaje}%</p>
                      <p className={`text-xs font-medium ${sector.variacion >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {sector.variacion > 0 ? '+' : ''}{sector.variacion}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Servicios domina el mercado */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-blue-800">Sector Servicios Dominante</h3>
                <p className="text-sm text-blue-700 mt-1">
                  El sector servicios representa el <span className="font-semibold">71.7%</span> del empleo en Extremadura,
                  seguido de construcción (13.0%) y agricultura (8.7%).
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Vista por educación */}
      {selectedView === 'educacion' && (
        <>
          <div className="mobile-card">
            <div className="mobile-card-header">
              <h3 className="mobile-card-title">Desempleo por Nivel Educativo</h3>
              <GraduationCap className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="mobile-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={desempleoEducacion} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="nivel" tick={{ fontSize: 10 }} />
                  <Bar dataKey="tasa" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              {desempleoEducacion.map((nivel, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: nivel.fill }}
                    />
                    <span className="text-sm font-medium text-gray-700">{nivel.nivel}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-600">{nivel.tasa}%</p>
                    <p className="text-xs text-gray-500">{nivel.personas.toLocaleString()} personas</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <GraduationCap className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-green-800">Educación reduce el desempleo</h3>
                <p className="text-sm text-green-700 mt-1">
                  La tasa de desempleo disminuye significativamente con mayor nivel educativo:
                  desde 15.2% sin estudios hasta 5.6% con estudios universitarios.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Indicadores de empresas */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Indicadores Empresariales</h3>
          <span className="text-xs text-gray-500">2024</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{extremaduraData2024.kpis.empresas_inscritas.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Empresas registradas</p>
            <p className="text-xs text-green-600 font-medium mt-1">+3.2% vs 2023</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{extremaduraData2024.kpis.afiliados_medios.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Afiliados medios</p>
            <p className="text-xs text-green-600 font-medium mt-1">+2.1% vs 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MercadoLaboral