import { useState, useEffect } from 'react'
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  ExternalLink,
  Database,
  FileSearch,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Info,
  Filter,
  Search,
  Download,
  Calendar,
  Link2,
  Building2,
  FileText
} from 'lucide-react'
import {
  obtenerDatosConTrazabilidad,
  obtenerResumenAuditoria,
  generarInformeVerificacion,
  calcularAntiguedadDatos,
  ESTADOS_VERIFICACION
} from '../services/verificacionService'
import { fuentesOficiales } from '../data/trazabilidadData'

const Trazabilidad = () => {
  const [datos, setDatos] = useState([])
  const [informe, setInforme] = useState(null)
  const [resumen, setResumen] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [verificando, setVerificando] = useState(false)
  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [filtroFuente, setFiltroFuente] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [expandidos, setExpandidos] = useState({})
  const [vistaActiva, setVistaActiva] = useState('datos')

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    setCargando(true)
    try {
      const datosConTrazabilidad = obtenerDatosConTrazabilidad()
      const resumenAuditoria = obtenerResumenAuditoria()
      setDatos(datosConTrazabilidad)
      setResumen(resumenAuditoria)
    } catch (error) {
      console.error('Error cargando datos:', error)
    }
    setCargando(false)
  }

  const ejecutarVerificacion = async () => {
    setVerificando(true)
    try {
      const resultado = await generarInformeVerificacion()
      setInforme(resultado)
    } catch (error) {
      console.error('Error en verificación:', error)
    }
    setVerificando(false)
  }

  const toggleExpandido = (id) => {
    setExpandidos(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const categorias = [...new Set(datos.map(d => d.categoria))]
  const fuentes = [...new Set(datos.map(d => d.fuente))]

  const datosFiltrados = datos.filter(dato => {
    const matchCategoria = filtroCategoria === 'todas' || dato.categoria === filtroCategoria
    const matchFuente = filtroFuente === 'todas' || dato.fuente === filtroFuente
    const matchBusqueda = busqueda === '' ||
      dato.descripcion?.toLowerCase().includes(busqueda.toLowerCase()) ||
      dato.campo?.toLowerCase().includes(busqueda.toLowerCase())
    return matchCategoria && matchFuente && matchBusqueda
  })

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case ESTADOS_VERIFICACION.VERIFICADO:
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case ESTADOS_VERIFICACION.ERROR:
        return <XCircle className="w-5 h-5 text-red-500" />
      case ESTADOS_VERIFICACION.DESACTUALIZADO:
        return <AlertTriangle className="w-5 h-5 text-amber-500" />
      case ESTADOS_VERIFICACION.VERIFICANDO:
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getFuenteInfo = (codigoFuente) => {
    return fuentesOficiales[codigoFuente] || null
  }

  const formatearValor = (valor, unidad) => {
    if (typeof valor === 'number') {
      if (unidad === 'porcentaje' || unidad === 'escala 0-10') {
        return valor.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      }
      if (unidad === 'euros' || unidad === 'euros/mes' || unidad === 'euros/año') {
        return valor.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
      }
      return valor.toLocaleString('es-ES')
    }
    return valor
  }

  const exportarInforme = () => {
    const contenido = JSON.stringify({
      fechaExportacion: new Date().toISOString(),
      resumen,
      datos: datosFiltrados,
      informe
    }, null, 2)

    const blob = new Blob([contenido], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `trazabilidad-extremadura-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando datos de trazabilidad...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 pt-safe">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">Trazabilidad de Datos</h1>
            <p className="text-indigo-200 text-sm">Panel de Auditoría</p>
          </div>
        </div>
      </div>

      {/* Resumen de Auditoría */}
      {resumen && (
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="mobile-card bg-white p-3">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5 text-indigo-500" />
                <span className="text-sm text-gray-600">Total Datos</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{resumen.totalDatos}</p>
            </div>
            <div className="mobile-card bg-white p-3">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Fuentes</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{resumen.fuentesUtilizadas.length}</p>
            </div>
            <div className="mobile-card bg-white p-3">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">Actualización</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(resumen.ultimaActualizacion).toLocaleDateString('es-ES')}
              </p>
            </div>
            <div className="mobile-card bg-white p-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Estado</span>
              </div>
              <p className="text-sm font-semibold text-green-600 capitalize">{resumen.estadoGeneral}</p>
            </div>
          </div>

          {/* Distribución por fuente */}
          <div className="mobile-card bg-white p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-indigo-500" />
              Distribución por Fuente
            </h3>
            <div className="space-y-2">
              {Object.entries(resumen.distribucionPorFuente).map(([fuente, info]) => (
                <div key={fuente} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{fuente}</span>
                      <span className="text-gray-500">{info.cantidad} datos ({info.porcentaje}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${info.porcentaje}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tabs de navegación */}
      <div className="px-4 mb-4">
        <div className="flex bg-gray-200 rounded-lg p-1">
          {[
            { key: 'datos', label: 'Datos', icon: Database },
            { key: 'fuentes', label: 'Fuentes', icon: Link2 },
            { key: 'verificacion', label: 'Verificar', icon: Shield }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setVistaActiva(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                vistaActiva === tab.key
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vista: Datos con Trazabilidad */}
      {vistaActiva === 'datos' && (
        <div className="px-4">
          {/* Barra de búsqueda y filtros */}
          <div className="mb-4 space-y-3">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar dato..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="flex-1 py-2 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="todas">Todas las categorías</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={filtroFuente}
                onChange={(e) => setFiltroFuente(e.target.value)}
                className="flex-1 py-2 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="todas">Todas las fuentes</option>
                {fuentes.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Lista de datos */}
          <div className="space-y-3">
            {datosFiltrados.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileSearch className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No se encontraron datos con los filtros actuales</p>
              </div>
            ) : (
              datosFiltrados.map((dato, index) => {
                const id = `${dato.categoria}-${dato.campo}-${index}`
                const fuenteInfo = getFuenteInfo(dato.fuente)
                const antiguedad = calcularAntiguedadDatos(dato.fechaExtraccion)
                const isExpanded = expandidos[id]

                return (
                  <div key={id} className="mobile-card bg-white overflow-hidden">
                    <button
                      onClick={() => toggleExpandido(id)}
                      className="w-full p-4 text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                              {dato.categoria}
                            </span>
                            {dato.subcategoria && (
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                {dato.subcategoria}
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-gray-900">
                            {dato.descripcion || dato.campo}
                          </p>
                          <p className="text-2xl font-bold text-indigo-600 mt-1">
                            {formatearValor(dato.valor, dato.unidad)}
                            {dato.unidad && (
                              <span className="text-sm font-normal text-gray-500 ml-1">
                                {dato.unidad === 'porcentaje' ? '%' : dato.unidad === 'escala 0-10' ? '/10' : ''}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getEstadoIcon(antiguedad.estado)}
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0 border-t border-gray-100 bg-gray-50">
                        <div className="space-y-3 mt-3">
                          {/* Fuente */}
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase mb-1">Fuente</p>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-800">
                                {fuenteInfo?.nombre || dato.fuente}
                              </span>
                            </div>
                          </div>

                          {/* URL de verificación */}
                          {dato.urlVerificacion && (
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase mb-1">URL de Verificación</p>
                              <a
                                href={dato.urlVerificacion}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span className="truncate">{dato.urlVerificacion}</span>
                              </a>
                            </div>
                          )}

                          {/* Fecha de extracción */}
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase mb-1">Fecha de Extracción</p>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-800">
                                {new Date(dato.fechaExtraccion).toLocaleDateString('es-ES', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                antiguedad.estado === ESTADOS_VERIFICACION.VERIFICADO
                                  ? 'bg-green-100 text-green-700'
                                  : antiguedad.estado === ESTADOS_VERIFICACION.DESACTUALIZADO
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {antiguedad.diasTranscurridos} días
                              </span>
                            </div>
                          </div>

                          {/* Período de referencia */}
                          {dato.periodoReferencia && (
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase mb-1">Período de Referencia</p>
                              <span className="text-sm text-gray-800">{dato.periodoReferencia}</span>
                            </div>
                          )}

                          {/* Metodología */}
                          {dato.metodologia && (
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase mb-1">Metodología</p>
                              <span className="text-sm text-gray-800">{dato.metodologia}</span>
                            </div>
                          )}

                          {/* Notas */}
                          {dato.notas && (
                            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                              <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                              <p className="text-sm text-blue-700">{dato.notas}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 text-center text-sm text-gray-500">
            Mostrando {datosFiltrados.length} de {datos.length} datos
          </div>
        </div>
      )}

      {/* Vista: Fuentes Oficiales */}
      {vistaActiva === 'fuentes' && (
        <div className="px-4 space-y-4">
          {Object.entries(fuentesOficiales).map(([codigo, fuente]) => (
            <div key={codigo} className="mobile-card bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{fuente.nombre}</h3>
                  <span className="text-xs font-mono text-gray-500">{codigo}</span>
                  <p className="text-sm text-gray-600 mt-1">{fuente.descripcion}</p>

                  <div className="mt-3 space-y-2">
                    <a
                      href={fuente.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Portal principal
                    </a>

                    {fuente.datosAbiertos && (
                      <a
                        href={fuente.datosAbiertos}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        <Database className="w-4 h-4" />
                        Datos abiertos
                      </a>
                    )}

                    {fuente.estadisticas && (
                      <a
                        href={fuente.estadisticas}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        <FileText className="w-4 h-4" />
                        Estadísticas
                      </a>
                    )}

                    {fuente.apiBase && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link2 className="w-4 h-4" />
                        API: {fuente.apiBase}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {fuente.tipoAcceso}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vista: Verificación */}
      {vistaActiva === 'verificacion' && (
        <div className="px-4">
          <div className="mobile-card bg-white p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-500" />
              Verificación de Integridad
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Este sistema verifica que los datos mostrados en la aplicación correspondan
              con las fuentes documentadas y que no existan discrepancias o datos inventados.
            </p>
            <button
              onClick={ejecutarVerificacion}
              disabled={verificando}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
            >
              {verificando ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Ejecutar Verificación
                </>
              )}
            </button>
          </div>

          {informe && (
            <div className="space-y-4">
              {/* Resumen del informe */}
              <div className="mobile-card bg-white p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Resultado de Verificación</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Total Verificados</p>
                    <p className="text-xl font-bold text-gray-900">{informe.resumen.totalDatos}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-600">Coherentes</p>
                    <p className="text-xl font-bold text-green-600">{informe.resumen.verificados}</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-xs text-red-600">Errores</p>
                    <p className="text-xl font-bold text-red-600">{informe.resumen.errores}</p>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <p className="text-xs text-indigo-600">Coherencia</p>
                    <p className="text-xl font-bold text-indigo-600">{informe.resumen.porcentajeCoherencia}%</p>
                  </div>
                </div>
              </div>

              {/* Estado de fuentes */}
              <div className="mobile-card bg-white p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Estado de Fuentes</h4>
                <div className="space-y-2">
                  {informe.fuentesVerificadas.map((fuente) => (
                    <div key={fuente.codigo} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        {fuente.accesible ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className="text-sm font-medium text-gray-800">{fuente.nombre}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        fuente.accesible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {fuente.accesible ? 'Disponible' : 'No verificable'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detalles por categoría */}
              {Object.entries(informe.porCategoria).map(([categoria, resultado]) => (
                <div key={categoria} className="mobile-card bg-white p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800 capitalize">{categoria}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      resultado.errores === 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {resultado.verificados}/{resultado.total} OK
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        resultado.errores === 0 ? 'bg-green-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${(resultado.verificados / resultado.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Botón de exportar */}
          <div className="mt-4">
            <button
              onClick={exportarInforme}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              <Download className="w-5 h-5" />
              Exportar Informe JSON
            </button>
          </div>
        </div>
      )}

      {/* Nota de transparencia */}
      <div className="px-4 mt-6 mb-4">
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">Nota de Transparencia</h4>
              <p className="text-sm text-amber-700 mt-1">
                Esta aplicación utiliza datos estáticos almacenados localmente.
                Los datos provienen de fuentes oficiales (INE, SEPE, Seguridad Social, etc.)
                pero no se actualizan en tiempo real. La fecha de extracción de cada dato
                está documentada para garantizar la trazabilidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trazabilidad
