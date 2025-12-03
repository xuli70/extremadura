import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { DollarSign, Calendar, TrendingUp, Clock, Users, CreditCard } from 'lucide-react'
import { extremaduraData2024, historicoData } from '../data/extremaduraData'

const Jubilacion = () => {
  const pensionHistorica = historicoData.pension_promedio.map(item => ({
    year: item.year,
    pension: item.value,
    minima: 385,
    maxima: 2650
  }))

  const modalidadJubilacion = [
    { modalidad: 'Ordinaria', porcentaje: 84.0, personas: 250965 },
    { modalidad: 'Anticipada', porcentaje: 12.3, personas: 36735 },
    { modalidad: 'Parcial', porcentaje: 3.7, personas: 11065 }
  ]

  const mainMetrics = [
    {
      title: 'Pensionistas Activos',
      value: extremaduraData2024.jubilacion.pensionistas_activos.toLocaleString(),
      change: '+2.1%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Pensión Promedio',
      value: `${extremaduraData2024.jubilacion.pension_promedio.toFixed(2)}€`,
      change: '+1.4%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Edad Jubilación',
      value: `${extremaduraData2024.jubilacion.edad_promedio_jubilacion}años`,
      change: '+0.2',
      trend: 'up',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Jubilación Anticipada',
      value: `${extremaduraData2024.jubilacion.jubilacion_anticipada}%`,
      change: '-0.8%',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Jubilación y Pensiones</h2>
        <p className="text-gray-600">Sistema de pensiones de Extremadura</p>
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
                  metric.color.includes('green') ? 'bg-green-50' : 
                  metric.color.includes('purple') ? 'bg-purple-50' : 'bg-orange-50'}`}>
                  <IconComponent className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{metric.title}</p>
                  <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <TrendingUp className={`w-3 h-3 ${isPositive ? 'text-green-500' : 'text-green-500'}`} />
                <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-green-600'}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Evolución de pensiones */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Evolución Pensión Promedio</h3>
          <CreditCard className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="mobile-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pensionHistorica}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Line 
                type="monotone" 
                dataKey="pension" 
                stroke="#0ea5e9" 
                strokeWidth={3}
                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="minima" 
                stroke="#ef4444" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="maxima" 
                stroke="#22c55e" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Promedio</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span>Mínima</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Máxima</span>
          </div>
        </div>
      </div>

      {/* Modalidades de jubilación */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Modalidades de Jubilación</h3>
          <span className="text-xs text-gray-500">Distribución 2024</span>
        </div>
        
        <div className="mobile-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={modalidadJubilacion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="modalidad" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Bar dataKey="porcentaje" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2">
          {modalidadJubilacion.map((modalidad, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-sm font-medium text-gray-700">{modalidad.modalidad}</span>
              <div className="text-right">
                <p className="text-sm font-semibold">{modalidad.porcentaje}%</p>
                <p className="text-xs text-gray-500">{modalidad.personas.toLocaleString()} personas</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rangos de pensiones */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Rangos de Pensiones</h3>
          <span className="text-xs text-gray-500">Euros mensuales</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-red-50 rounded-lg p-3">
            <p className="text-xl font-bold text-red-600">{extremaduraData2024.jubilacion.pension_minima}€</p>
            <p className="text-xs text-gray-500">Mínima</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xl font-bold text-blue-600">{extremaduraData2024.jubilacion.pension_promedio.toFixed(0)}€</p>
            <p className="text-xs text-gray-500">Promedio</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xl font-bold text-green-600">{extremaduraData2024.jubilacion.pension_maxima}€</p>
            <p className="text-xs text-gray-500">Máxima</p>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            Diferencia entre pensión máxima y mínima: 
            <span className="font-semibold"> {(extremaduraData2024.jubilacion.pension_maxima - extremaduraData2024.jubilacion.pension_minima).toFixed(2)}€</span>
          </p>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="mobile-card">
        <h3 className="mobile-card-title mb-4">Estadísticas Destacadas</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Jubilación parcial</p>
              <p className="text-xs text-gray-500">Transición gradual</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-purple-600">{extremaduraData2024.jubilacion.jubilacion_parcial}%</p>
              <p className="text-xs text-gray-500">del total</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Incremento anual</p>
              <p className="text-xs text-gray-500">Sobre 2023</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">+1.4%</p>
              <p className="text-xs text-gray-500">incremento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerta sostenibilidad */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Calendar className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-amber-800">Sostenibilidad del Sistema</h3>
            <p className="text-sm text-amber-700 mt-1">
              Con un <span className="font-semibold">12.3%</span> de jubilación anticipada y la edad promedio 
              de <span className="font-semibold">{extremaduraData2024.jubilacion.edad_promedio_jubilacion} años</span>, 
              es importante monitorizar la sostenibilidad del sistema de pensiones.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jubilacion