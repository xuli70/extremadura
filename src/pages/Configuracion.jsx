import React from 'react'
import { Bell, RefreshCw, Download, Info, Moon, Sun, Volume2, Shield } from 'lucide-react'

const Configuracion = () => {
  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuración</h2>
        <p className="text-gray-600">Personaliza tu experiencia</p>
      </div>

      {/* Notificaciones */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Notificaciones</h3>
          <Bell className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Actualizaciones automáticas</p>
              <p className="text-xs text-gray-500">Recibir alertas cuando hay nuevos datos</p>
            </div>
            <button className="w-11 h-6 bg-primary-600 rounded-full flex items-center justify-end px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Alertas de umbrales</p>
              <p className="text-xs text-gray-500">Notificar cambios significativos</p>
            </div>
            <button className="w-11 h-6 bg-primary-600 rounded-full flex items-center justify-end px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Datos y actualización */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Datos y Actualización</h3>
          <RefreshCw className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Actualización automática</p>
              <p className="text-xs text-gray-500">Cada 30 minutos</p>
            </div>
            <button className="w-11 h-6 bg-primary-600 rounded-full flex items-center justify-end px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Modo offline</p>
              <p className="text-xs text-gray-500">Usar datos cacheados sin conexión</p>
            </div>
            <button className="w-11 h-6 bg-gray-200 rounded-full flex items-center justify-start px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>
          
          <button className="mobile-btn-primary w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar datos ahora
          </button>
        </div>
      </div>

      {/* Apariencia */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Apariencia</h3>
          <Sun className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Modo oscuro</p>
              <p className="text-xs text-gray-500">Reducir fatiga visual</p>
            </div>
            <button className="w-11 h-6 bg-gray-200 rounded-full flex items-center justify-start px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Tamaño de texto</p>
              <p className="text-xs text-gray-500">Mediano</p>
            </div>
            <button className="text-xs text-primary-600">Cambiar</button>
          </div>
        </div>
      </div>

      {/* Accesibilidad */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Accesibilidad</h3>
          <Volume2 className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Alto contraste</p>
              <p className="text-xs text-gray-500">Mejorar legibilidad</p>
            </div>
            <button className="w-11 h-6 bg-gray-200 rounded-full flex items-center justify-start px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Lectura por voz</p>
              <p className="text-xs text-gray-500">Narración de datos importantes</p>
            </div>
            <button className="w-11 h-6 bg-gray-200 rounded-full flex items-center justify-start px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Seguridad y privacidad */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Seguridad</h3>
          <Shield className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Permitir análisis anónimos</p>
              <p className="text-xs text-gray-500">Mejorar la app con datos de uso</p>
            </div>
            <button className="w-11 h-6 bg-primary-600 rounded-full flex items-center justify-end px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Cifrado de datos</p>
              <p className="text-xs text-gray-500">Protección avanzada activada</p>
            </div>
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Almacenamiento */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Almacenamiento</h3>
          <Download className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Caché de datos</p>
              <p className="text-xs text-gray-500">32.4 MB utilizados</p>
            </div>
            <button className="text-xs text-red-600">Limpiar</button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Exportar datos</p>
              <p className="text-xs text-gray-500">Descargar como CSV/Excel</p>
            </div>
            <button className="text-xs text-primary-600">Exportar</button>
          </div>
        </div>
      </div>

      {/* Información */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Información</h3>
          <Info className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Versión de la app</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Última actualización</span>
            <span className="font-medium">4 dic 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Desarrollado por</span>
            <span className="font-medium">XULI Master</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fuentes de datos</span>
            <span className="text-primary-600">Ver fuentes</span>
          </div>
        </div>
      </div>

      {/* Soporte */}
      <div className="mobile-card">
        <div className="mobile-card-header">
          <h3 className="mobile-card-title">Soporte y Feedback</h3>
        </div>
        
        <div className="space-y-3">
          <button className="mobile-btn-secondary w-full text-left">
            Enviar feedback
          </button>
          <button className="mobile-btn-secondary w-full text-left">
            Reportar problema
          </button>
          <button className="mobile-btn-secondary w-full text-left">
            Preguntas frecuentes
          </button>
        </div>
      </div>

      {/* Política de privacidad */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Política de Privacidad</h3>
        <p className="text-xs text-gray-600">
          Esta aplicación utiliza datos públicos oficiales y no recopila información personal. 
          Los datos se obtienen de fuentes gubernamentales españolas y europeas.
        </p>
      </div>
    </div>
  )
}

export default Configuracion