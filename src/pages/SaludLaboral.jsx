import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Heart, Shield, Activity, Brain, AlertTriangle, TrendingDown, Users, Clock } from 'lucide-react'
import { extremaduraData2024, historicoData } from '../data/extremaduraData'

const SaludLaboral = () => {
  const [selectedMetric, setSelectedMetric] = useState('accidentes')
  const [timeRange, setTimeRange] = useState('5years')

  // Datos para gráficos
  const accidentesHistorico = historicoData.accidentes_trabajo.map(item => ({
    year: item.year,
    accidentes: item.value,
    accidentes_mortales: item.value * 0.002 // Estimación
  }))

  const bienestarData = [
    { area: 'Satisfacción', value: extremaduraData2024.bienestar.satisfaccion_trabajo, max: 10 },
    { area: 'Equilibrio', value: extremaduraData2024.bienestar.equilibrio_vida_trabajo, max: 10 },
    { area: 'Estrés', value: 10 - extremaduraData2024.bienestar.estres_laboral, max: 10 }, // Invertido para mejor visualización
    { area: 'Burnout', value: 10 - extremaduraData2024.bienestar.burnout, max: 10 }, // Invertido
    { area: 'Salarios', value: extremaduraData2024.bienestar.satisfaccion_salarios, max: 10 },
    { area: 'Condiciones', value: extremaduraData2024.bienestar.condiciones_trabajo, max: 10 },
    { area: 'Relaciones', value: extremaduraData2024.bienestar.relaciones_laborales, max: 10 },
    { area: 'Desarrollo', value: extremaduraData2024.bienestar.desarrollo_profesional, max: 10 }
  ]

  const comparacionSectores = [
    { sector: 'Agricultura', accidentes: 5.2, absentismo: 6.8 },
    { sector: 'Industria', accidentes: 4.8, absentismo: 5.1 },
    { sector: 'Construcción', accidentes: 8.9, absentismo: 7.2 },
    { sector: 'Servicios', accidentes: 2.1, absentismo: 3.9 }
  ]

  const mainMetrics = [
    {
      title: 'Accidentes Trabajo',
      value: extremaduraData2024.saludLaboral.accidentes_trabajo,
      change: '-5.2%',
      trend: 'down',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'casos registrados'
    },
    {
      title: 'Tasa Accidentes',
      value: `${extremaduraData2024.saludLaboral.tasa_accidentes}‰`,
      change: '-0.3‰',
      trend: 'down',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'por mil empleados'
    },
    {
      title: 'Absentismo',
      value: `${extremaduraData2024.saludLaboral.tasa_absentismo}%`,
      change: '-0.3%',
      trend: 'down',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'de jornadas perdidas'
    },
    {
      title: 'Enfermedades Prof.',
      value: extremaduraData2024.saludLaboral.enfermedades_profesionales,
      change: '+2.1%',
      trend: 'up',
      icon: Heart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'nuevos casos'
    }
  ]

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header de la página */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Salud Laboral</h2>
        <p className="text-gray-600">Indicadores de seguridad y bienestar</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 gap-3">
        {mainMetrics.map((metric, index) => {
          const IconComponent = metric.icon
          const isPositive = metric.trend === 'down' && metric.title !== 'Enfermedades Prof.' ? true : metric.trend === 'up' && metric.title === 'Enfermedades Prof.' ? false : false
          
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
                    <TrendingDown className="w-3 h-3 text-green-500" />
                  ) : (
                    <Activity className="w-3 h-3 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Alerta de seguridad */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-amber-800">Construcción: Sector de Mayor Riesgo</h3>
            <p className="text-sm text-amber-700 mt-1">
              El sector de la construcción presenta la mayor tasa de accidentes laborales (8.9‰),
              seguido de agricultura (5.2‰). Se recomienda reforzar las medidas preventivas.
            </p>
          </div>
        </div>
      </div>

      {/* Evolución de accidentes */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Tendencia de Accidentes</h3>
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
            <LineChart data={accidentesHistorico}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Line 
                type="monotone" 
                dataKey="accidentes" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Total accidentes</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span>Mortales estimados</span>
          </div>
        </div>
      </div>

      {/* Indicadores por sector */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Riesgo por Sectores</h3>
          <span className="text-xs text-gray-500">Tasa por mil empleados</span>
        </div>
        
        <div className="mobile-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparacionSectores}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="sector" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Bar dataKey="accidentes" fill="#ef4444" name="Accidentes" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absentismo" fill="#f59e0b" name="Absentismo" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-3 space-y-2">
          {comparacionSectores.map((sector, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-sm font-medium text-gray-700">{sector.sector}</span>
              <div className="text-right">
                <p className="text-sm font-semibold text-red-600">{sector.accidentes}‰</p>
                <p className="text-xs text-gray-500">Absentismo: {sector.absentismo}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bienestar laboral */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Bienestar Laboral</h3>
          <div className="flex items-center space-x-1">
            <Brain className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-purple-600 font-medium">Radar de bienestar</span>
          </div>
        </div>
        
        <div className="mobile-chart">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={bienestarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="area" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fontSize: 8 }} />
              <Radar 
                name="Bienestar" 
                dataKey="value" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-600">
            Puntuación media: <span className="font-semibold text-purple-600">
              {(bienestarData.reduce((acc, item) => acc + item.value, 0) / bienestarData.length).toFixed(1)}/10
            </span>
          </p>
        </div>
      </div>

      {/* Días perdidos por absentismo */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Absentismo Laboral</h3>
          <span className="text-xs text-gray-500">Días perdidos anuales</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-red-600">{(extremaduraData2024.saludLaboral.dias_perdidos_absentismo / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-gray-500">Total días</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{extremaduraData2024.saludLaboral.tasa_absentismo}%</p>
            <p className="text-xs text-gray-500">Tasa media</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{(extremaduraData2024.saludLaboral.dias_perdidos_absentismo / (extremaduraData2024.kpis.afiliados_medios * 365) * 100).toFixed(1)}%</p>
            <p className="text-xs text-gray-500">Sobre jornadas</p>
          </div>
        </div>
      </div>

      {/* Reconocimientos médicos */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Prevención y Vigilancia</h3>
          <span className="text-xs text-gray-500">% cobertura</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Reconocimientos médicos</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${extremaduraData2024.saludLaboral.reconocimientos_medicos}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-green-600">{extremaduraData2024.saludLaboral.reconocimientos_medicos}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Formación prevención</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${extremaduraData2024.saludLaboral.formacion_prevencion}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-blue-600">{extremaduraData2024.saludLaboral.formacion_prevencion}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de mejora */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <TrendingDown className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-green-800">Tendencia Positiva</h3>
            <p className="text-sm text-green-700 mt-1">
              Los accidentes laborales han disminuido un <span className="font-semibold">5.2%</span> respecto a 2023.
              El absentismo también muestra una tendencia decreciente, mejorando la productividad.
            </p>
          </div>
        </div>
      </div>

      {/* Accidentes mortales */}
      {extremaduraData2024.saludLaboral.accidentes_mortales > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-red-800">Prevención Fatal</h3>
              <p className="text-sm text-red-700 mt-1">
                Se han registrado <span className="font-semibold">{extremaduraData2024.saludLaboral.accidentes_mortales}</span> accidentes mortales en 2024.
                Cada caso requiere investigación exhaustiva y mejora de protocolos de seguridad.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SaludLaboral