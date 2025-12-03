import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { TrendingUp, TrendingDown, MapPin, BarChart3, Flag } from 'lucide-react'
import { extremaduraData2024 } from '../data/extremaduraData'

const Comparaciones = () => {
  // Datos de comparación nacional
  const comparacionNacional = [
    { 
      metric: 'Tasa Actividad', 
      extremadura: extremaduraData2024.comparacionNacional.extremadura_vs_nacional.tasa_actividad, 
      nacional: extremaduraData2024.comparacionNacional.extremadura_vs_nacional.tasa_actividad.nacional || 53.2,
      unit: '%'
    },
    { 
      metric: 'Tasa Empleo', 
      extremadura: extremaduraData2024.comparacionNacional.extremadura_vs_nacional.tasa_empleo, 
      nacional: 49.8,
      unit: '%'
    },
    { 
      metric: 'Tasa Paro', 
      extremadura: extremaduraData2024.comparacionNacional.extremadura_vs_nacional.tasa_paro, 
      nacional: 6.4,
      unit: '%'
    },
    { 
      metric: 'Salario Medio (k€)', 
      extremadura: extremaduraData2024.comparacionNacional.extremadura_vs_nacional.salario_medio / 1000, 
      nacional: 28.7,
      unit: 'k€'
    },
    { 
      metric: 'Productividad', 
      extremadura: extremaduraData2024.comparacionNacional.extremadura_vs_nacional.productividad, 
      nacional: 108,
      unit: 'indice'
    },
    { 
      metric: 'IDH', 
      extremadura: extremaduraData2024.comparacionNacional.extremadura_vs_nacional.indice_desarrollo, 
      nacional: 0.95,
      unit: ''
    }
  ]

  // Comparación con comunidades autónomas similares
  const comunidadesComparables = [
    { nombre: 'Extremadura', poblacion: 1068, tasa_actividad: 49.0, tasa_paro: 7.8, pension: 891 },
    { nombre: 'Castilla-La Mancha', poblacion: 2051, tasa_actividad: 51.2, tasa_paro: 8.9, pension: 865 },
    { nombre: 'Andalucía', poblacion: 8516, tasa_actividad: 50.8, tasa_paro: 15.2, pension: 856 },
    { nombre: 'Castilla y León', poblacion: 2395, tasa_actividad: 52.1, tasa_paro: 7.2, pension: 912 },
    { nombre: 'Galicia', poblacion: 2699, tasa_actividad: 51.9, tasa_paro: 6.8, pension: 889 }
  ]

  // Datos para el radar comparativo
  const radarData = [
    { area: 'Empleabilidad', extremadura: 45.2, media_nacional: 49.8 },
    { area: 'Productividad', extremadura: 100, media_nacional: 108 },
    { area: 'Salarios', extremadura: 81.6, media_nacional: 100 },
    { area: 'Calidad Vida', extremadura: 85, media_nacional: 95 },
    { area: 'Educación', extremadura: 78, media_nacional: 90 },
    { area: 'Innovación', extremadura: 65, media_nacional: 85 }
  ]

  // Puntos fuertes y débiles
  const fortalezas = [
    {
      area: 'Tasa de Paro',
      valor: `${extremaduraData2024.poblacion.tasas.paro}%`,
      comparacion: 'Menos que Castilla-La Mancha (8.9%)',
      icon: TrendingDown,
      color: 'text-green-600'
    },
    {
      area: 'Pensión Promedio',
      valor: `${extremaduraData2024.jubilacion.pension_promedio.toFixed(0)}€`,
      comparacion: 'Superior a Andalucía (856€)',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      area: 'Bienestar Laboral',
      valor: '7.1/10',
      comparacion: 'Buen equilibrio vida-trabajo',
      icon: TrendingUp,
      color: 'text-green-600'
    }
  ]

  const areasMejora = [
    {
      area: 'Tasa de Actividad',
      valor: `${extremaduraData2024.poblacion.tasas.actividad}%`,
      comparacion: 'Baja vs media nacional (53.2%)',
      icon: TrendingDown,
      color: 'text-red-600'
    },
    {
      area: 'Salario Medio',
      valor: '23.4k€',
      comparacion: '17% por debajo de media nacional',
      icon: TrendingDown,
      color: 'text-red-600'
    },
    {
      area: 'Productividad',
      valor: '100',
      comparacion: 'Índice base nacional: 108',
      icon: TrendingDown,
      color: 'text-red-600'
    }
  ]

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Comparaciones</h2>
        <p className="text-gray-600">Extremadura vs nacional y CCAA</p>
      </div>

      {/* Posición nacional */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Flag className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">Posición Nacional</h3>
        </div>
        <p className="text-sm text-blue-800">
          Extremadura se sitúa en una posición <span className="font-semibold">intermedia-baja</span> en indicadores económicos, 
          pero con <span className="font-semibold">buen desempeño social</span> y calidad de vida.
        </p>
      </div>

      {/* Comparación con media nacional */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Extremadura vs España</h3>
          <span className="text-xs text-gray-500">Indicadores principales</span>
        </div>
        
        <div className="mobile-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparacionNacional}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="metric" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Bar dataKey="extremadura" fill="#0ea5e9" name="Extremadura" radius={[4, 4, 0, 0]} />
              <Bar dataKey="nacional" fill="#94a3b8" name="Nacional" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Extremadura</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span>Media Nacional</span>
          </div>
        </div>
      </div>

      {/* Radar comparativo */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Perfil Comparativo</h3>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="mobile-chart">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="area" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fontSize: 8 }} />
              <Radar 
                name="Extremadura" 
                dataKey="extremadura" 
                stroke="#0ea5e9" 
                fill="#0ea5e9" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar 
                name="Media Nacional" 
                dataKey="media_nacional" 
                stroke="#94a3b8" 
                fill="#94a3b8" 
                fillOpacity={0.1}
                strokeWidth={1}
                strokeDasharray="5 5"
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparación con CCAA similares */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">CCAA Similares</h3>
          <MapPin className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          {comunidadesComparables.map((ccaa, index) => (
            <div key={index} className={`p-3 rounded-lg border-2 ${
              ccaa.nombre === 'Extremadura' ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`text-sm font-semibold ${ccaa.nombre === 'Extremadura' ? 'text-blue-900' : 'text-gray-900'}`}>
                  {ccaa.nombre} {ccaa.nombre === 'Extremadura' && '(Extremadura)'}
                </h4>
                <span className="text-xs text-gray-500">{ccaa.poblacion}k hab</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <p className="text-gray-500">Actividad</p>
                  <p className={`font-semibold ${ccaa.nombre === 'Extremadura' ? 'text-blue-600' : 'text-gray-700'}`}>
                    {ccaa.tasa_actividad}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500">Paro</p>
                  <p className={`font-semibold ${ccaa.nombre === 'Extremadura' ? 'text-blue-600' : 'text-gray-700'}`}>
                    {ccaa.tasa_paro}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500">Pensión</p>
                  <p className={`font-semibold ${ccaa.nombre === 'Extremadura' ? 'text-blue-600' : 'text-gray-700'}`}>
                    {ccaa.pension}€
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Puntos fuertes */}
      <div className="mobile-card">
        <h3 className="mobile-card-title mb-4">Puntos Fuertes</h3>
        
        <div className="space-y-3">
          {fortalezas.map((fortaleza, index) => {
            const IconComponent = fortaleza.icon
            
            return (
              <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <IconComponent className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-green-800">{fortaleza.area}</h4>
                    <span className="text-sm font-bold text-green-600">{fortaleza.valor}</span>
                  </div>
                  <p className="text-xs text-green-700">{fortaleza.comparacion}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Áreas de mejora */}
      <div className="mobile-card">
        <h3 className="mobile-card-title mb-4">Áreas de Mejora</h3>
        
        <div className="space-y-3">
          {areasMejora.map((area, index) => {
            const IconComponent = area.icon
            
            return (
              <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-lg">
                  <IconComponent className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-red-800">{area.area}</h4>
                    <span className="text-sm font-bold text-red-600">{area.valor}</span>
                  </div>
                  <p className="text-xs text-red-700">{area.comparacion}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Resumen ejecutivo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-800">Análisis Competitivo</h3>
            <p className="text-sm text-blue-700 mt-1">
              Extremadura presenta un <span className="font-semibold">perfil equilibrado</span> con fortalezas en 
              estabilidad del empleo y bienestar social, pero con oportunidades de mejora en 
              <span className="font-semibold"> productividad y salario medio</span>. 
              Su posición es competitiva frente a regiones de tamaño similar.
            </p>
          </div>
        </div>
      </div>

      {/* Ranking de indicadores */}
      <div className="mobile-card">
        <h3 className="mobile-card-title mb-4">Ranking Nacional (estimado)</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Tasa de Paro</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-xs font-medium text-green-600">Posición 8/17</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Pensión Promedio</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-xs font-medium text-blue-600">Posición 10/17</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Productividad</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <span className="text-xs font-medium text-orange-600">Posición 12/17</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Calidad de Vida</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-xs font-medium text-green-600">Posición 9/17</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comparaciones