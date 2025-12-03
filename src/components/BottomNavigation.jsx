import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, TrendingUp, Users, Heart, BarChart3 } from 'lucide-react'

const navigationItems = [
  {
    path: '/',
    label: 'General',
    icon: Home,
  },
  {
    path: '/mercado-laboral',
    label: 'Laboral',
    icon: TrendingUp,
  },
  {
    path: '/salud-laboral',
    label: 'Salud',
    icon: Heart,
  },
  {
    path: '/kpis',
    label: 'KPIs',
    icon: BarChart3,
  },
  {
    path: '/configuracion',
    label: 'Más',
    icon: Users,
  },
]

const BottomNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="mobile-nav safe-bottom">
      <div className="flex items-center justify-around">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path
          const IconComponent = item.icon
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <IconComponent 
                className={`w-5 h-5 mb-1 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} 
              />
              <span className={`text-xs ${isActive ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
      
      {/* Indicador de página activa */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200">
        <div 
          className="h-full bg-primary-600 transition-all duration-300"
          style={{ 
            width: `${((navigationItems.findIndex(item => item.path === location.pathname) + 1) / navigationItems.length) * 100}%`,
            transform: `translateX(${navigationItems.findIndex(item => item.path === location.pathname) * 100}%)`
          }}
        />
      </div>
    </nav>
  )
}

export default BottomNavigation