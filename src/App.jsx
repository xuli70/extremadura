import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Menu, TrendingUp, Users, Heart, Bell, Settings } from 'lucide-react'

// Páginas principales
import VisionGeneral from './pages/VisionGeneral'
import MercadoLaboral from './pages/MercadoLaboral'
import SaludLaboral from './pages/SaludLaboral'
import Comparaciones from './pages/Comparaciones'
import Jubilacion from './pages/Jubilacion'
import Bienestar from './pages/Bienestar'
import KPIs from './pages/KPIs'
import Configuracion from './pages/Configuracion'

// Componentes de navegación
import BottomNavigation from './components/BottomNavigation'
import PullToRefresh from './components/PullToRefresh'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showRefresh, setShowRefresh] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Simular carga inicial
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  const handleRefresh = async () => {
    setShowRefresh(true)
    // Simular actualización de datos
    await new Promise(resolve => setTimeout(resolve, 1000))
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Dashboard Extremadura</h2>
          <p className="text-gray-500">Cargando datos laborales y de salud...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Pull to refresh */}
      {showRefresh && (
        <PullToRefresh onComplete={() => setShowRefresh(false)} />
      )}
      
      {/* Header principal */}
      <header className="bg-white shadow-sm safe-top">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Dashboard EXT</h1>
                <p className="text-xs text-gray-500">Extremadura - 2024</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<VisionGeneral />} />
          <Route path="/mercado-laboral" element={<MercadoLaboral />} />
          <Route path="/salud-laboral" element={<SaludLaboral />} />
          <Route path="/jubilacion" element={<Jubilacion />} />
          <Route path="/bienestar" element={<Bienestar />} />
          <Route path="/comparaciones" element={<Comparaciones />} />
          <Route path="/kpis" element={<KPIs />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Routes>
      </main>

      {/* Navegación inferior */}
      <BottomNavigation />

      {/* Notificación de actualización */}
      <div className="fixed top-4 left-4 right-4 z-40">
        <div className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm shadow-lg animate-fadeInUp">
          <div className="flex items-center justify-between">
            <span>Última actualización: 4 dic 2024, 03:21</span>
            <button className="text-white/80 hover:text-white">×</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App