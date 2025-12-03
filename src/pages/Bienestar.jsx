import React from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Smile, Heart, Brain, Users, TrendingUp, Shield } from 'lucide-react'
import { extremaduraData2024 } from '../data/extremaduraData'

const Bienestar = () => {
  const bienestarData = [
    { 
      area: 'Satisfacción Trabajo', 
      valor: extremaduraData2024.bienestar.satisfaccion_trabajo,
      descripcion: 'Grado de satisfacción general',
      max: 10
    },
    { 
      area: 'Equilibrio Vida', 
      valor: extremaduraData2024.bienestar.equilibrio_vida_trabajo,
      descripcion: 'Balance personal-laboral',
      max: 10
    },
    { 
      area: 'Estrés Laboral', 
      valor: 10 - extremaduraData2024.bienestar.estres_laboral,
      descripcion: 'Inverso para mejor visualización',
      max: 10
    },
    { 
      area: 'Satisfacción Salarial', 
      valor: extremaduraData2024.bienestar.satisfaccion_salarios,
      descripcion: 'Remuneración percibida',
      max: 10
    },
    { 
      area: 'Condiciones Trabajo', 
      valor: extremaduraData2024.bienestar.condiciones_trabajo,
      descripcion: 'Ambiente y herramientas',
      max: 10
    },
    { 
      area: 'Relaciones Laborales', 
      valor: extremaduraData2024.bienestar.relaciones_laborales,
      descripcion: 'Clima y convivencia',
      max: 10
    },
    { 
      area: 'Desarrollo Profesional', 
      valor: extremaduraData2024.bienestar.desarrollo_profesional,
      descripcion: 'Crecimiento y formación',
      max: 10
    },
    { 
      area: 'Ausencia Burnout', 
      valor: 10 - extremaduraData2024.bienestar.burnout,
      descripcion: 'Bienestar emocional',
      max: 10
    }
  ]

  const comparativaPorEdad = [
    { edad: '16-24', satisfaccion: 7.2, equilibrio: 6.8, estres: 5.9 },
    { edad: '25-34', satisfaccion: 7.5, equilibrio: 6.9, estres: 6.2 },
    { edad: '35-44', satisfaccion: 7.1, equilibrio: 7.0, estres: 5.8 },
    { edad: '45-54', satisfaccion: 7.3, equilibrio: 7.4, estres: 5.1 },
    { edad: '55-64', satisfaccion: 6.9, equilibrio: 7.5, estres: 4.8 }
  ]

  const mainMetrics = [
    {
      title: 'Satisfacción General',
      value: (extremaduraData2024.bienestar.satisfaccion_trabajo + extremaduraData2024.bienestar.equilibrio_vida_trabajo) / 2,
      unit: '/10',
      icon: Smile,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Nivel de Estrés',
      value: 10 - extremaduraData2024.bienestar.estres_laboral,
      unit: '/10',
      icon: Brain,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Burnout',
      value: extremaduraData2024.bienestar.burnout,
      unit: '/10',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Clima Laboral',
      value: (extremaduraData2024.bienestar.relaciones_laborales + extremaduraData2024.bienestar.condiciones_trabajo) / 2,
      unit: '/10',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ]

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienestar Laboral</h2>
        <p className="text-gray-600">Calidad de vida y satisfacción laboral</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 gap-3">
        {mainMetrics.map((metric, index) => {
          const IconComponent = metric.icon
          
          return (
            <div key={index} className="mobile-card">
              <div className={`${metric.bgColor} rounded-lg p-3 mb-3`}>
                <IconComponent className={`w-6 h-6 ${metric.color}`} />
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value.toFixed(1)}{metric.unit}</p>
                <p className="text-xs text-gray-600">
                  {metric.value >= 7 ? 'Bien nivel' : metric.value >= 6 ? 'Nivel medio' : 'Necesita mejora'}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Radar de bienestar */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Radar de Bienestar</h3>
          <Shield className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="mobile-chart">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={bienestarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="area" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fontSize: 8 }} domain={[0, 10]} />
              <Radar 
                name="Bienestar" 
                dataKey="valor" 
                stroke="#22c55e" 
                fill="#22c55e" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600">
            Puntuación media: <span className="font-semibold text-green-600">
              {(bienestarData.reduce((acc, item) => acc + item.valor, 0) / bienestarData.length).toFixed(1)}/10
            </span>
          </p>
        </div>
      </div>

      {/* Análisis detallado */}
      <div className="mobile-card">
        <h3 className="mobile-card-title mb-4">Análisis por Áreas</h3>
        
        <div className="space-y-3">
          {bienestarData.map((area, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-900">{area.area}</h4>
                <span className={`text-sm font-bold ${
                  area.valor >= 7 ? 'text-green-600' : 
                  area.valor >= 6 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {area.valor.toFixed(1)}/10
                </span>
              </div>
              
              <p className="text-xs text-gray-600 mb-2">{area.descripcion}</p>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    area.valor >= 7 ? 'bg-green-500' : 
                    area.valor >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(area.valor / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparativa por edad */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Bienestar por Edad</h3>
          <span className="text-xs text-gray-500">Satisfacción por tramos</span>
        </div>
        
        <div className="mobile-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparativaPorEdad}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="edad" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 10]} />
              <Bar dataKey="satisfaccion" fill="#0ea5e9" name="Satisfacción" radius={[4, 4, 0, 0]} />
              <Bar dataKey="equilibrio" fill="#22c55e" name="Equilibrio" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Satisfacción</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Equilibrio</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Menor estrés</span>
          </div>
        </div>
      </div>

      {/* Áreas de mejora */}
      <div className="mobile-card">
        <h3 className="mobile-card-title mb-4">Áreas de Mejora</h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-red-800">Burnout y Estrés</p>
              <p className="text-xs text-red-700">
                Niveles moderados de burnout ({extremaduraData2024.bienestar.burnout}/10) 
                sugieren necesidad de programas de gestión del estrés.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-orange-800">Desarrollo Profesional</p>
              <p className="text-xs text-orange-700">
                Oportunidades de crecimiento percibidas en nivel medio 
                ({extremaduraData2024.bienestar.desarrollo_profesional}/10).
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-green-800">Relaciones Laborales</p>
              <p className="text-xs text-green-700">
                Excelente clima social ({extremaduraData2024.bienestar.relaciones_laborales}/10), 
                fortaleza a mantener.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-800">Recomendaciones</h3>
            <p className="text-sm text-blue-700 mt-1">
              Se recomienda implementar programas de <span className="font-semibold">mindfulness</span> y 
              gestión del estrés, además de ampliar las oportunidades de <span className="font-semibold">desarrollo profesional</span> 
              para mantener el alto nivel de satisfacción laboral.
            </p>
          </div>
        </div>
      </div>

      {/* Indicador positivo */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Heart className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-green-800">Fortaleza Regional</h3>
            <p className="text-sm text-green-700 mt-1">
              Extremadura mantiene un <span className="font-semibold">buen equilibrio vida-trabajo</span> 
              (7.1/10) y excelentes relaciones laborales (7.8/10), posicionándose favorablemente 
              en comparación con otras regiones españolas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bienestar