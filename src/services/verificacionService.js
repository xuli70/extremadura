// Servicio de verificación de fuentes de datos
// Realiza comprobaciones de disponibilidad y coherencia de las fuentes oficiales

import { fuentesOficiales, trazabilidadDatos, resumenAuditoria } from '../data/trazabilidadData'
import { extremaduraData2024, historicoData, datosProvinciales } from '../data/extremaduraData'

// Estados de verificación
export const ESTADOS_VERIFICACION = {
  PENDIENTE: 'pendiente',
  VERIFICANDO: 'verificando',
  VERIFICADO: 'verificado',
  ERROR: 'error',
  DESACTUALIZADO: 'desactualizado',
  NO_DISPONIBLE: 'no_disponible'
}

// Verifica si una URL está accesible (simulado para entorno cliente)
export const verificarDisponibilidadURL = async (url) => {
  try {
    // En un entorno real, esto requeriría un backend proxy debido a CORS
    // Por ahora, verificamos la estructura de la URL
    const urlObj = new URL(url)
    const dominiosValidos = [
      'www.ine.es',
      'ine.es',
      'www.sepe.es',
      'sepe.es',
      'www.seg-social.es',
      'seg-social.es',
      'www.mites.gob.es',
      'mites.gob.es',
      'www.juntaex.es',
      'juntaex.es',
      'gobiernoabierto.juntaex.es',
      'contratacion.juntaex.es',
      'datos.gob.es',
      'servicios.ine.es'
    ]

    const dominioValido = dominiosValidos.some(d => urlObj.hostname.includes(d))

    return {
      accesible: dominioValido,
      url,
      timestamp: new Date().toISOString(),
      nota: dominioValido
        ? 'URL válida de fuente oficial'
        : 'Dominio no reconocido como fuente oficial'
    }
  } catch (error) {
    return {
      accesible: false,
      url,
      timestamp: new Date().toISOString(),
      error: 'URL no válida'
    }
  }
}

// Verifica la coherencia entre datos mostrados y trazabilidad
export const verificarCoherenciaDatos = (categoria, campo, valorMostrado) => {
  try {
    const trazabilidad = obtenerTrazabilidadPorCampo(categoria, campo)

    if (!trazabilidad) {
      return {
        coherente: false,
        estado: ESTADOS_VERIFICACION.ERROR,
        mensaje: 'No se encontró trazabilidad para este dato',
        valorMostrado,
        valorDocumentado: null
      }
    }

    const valorDocumentado = trazabilidad.valor
    const coherente = valorMostrado === valorDocumentado

    return {
      coherente,
      estado: coherente ? ESTADOS_VERIFICACION.VERIFICADO : ESTADOS_VERIFICACION.ERROR,
      mensaje: coherente
        ? 'Dato coherente con la documentación'
        : 'Discrepancia detectada entre dato mostrado y documentado',
      valorMostrado,
      valorDocumentado,
      diferencia: coherente ? 0 : Math.abs(valorMostrado - valorDocumentado),
      trazabilidad
    }
  } catch (error) {
    return {
      coherente: false,
      estado: ESTADOS_VERIFICACION.ERROR,
      mensaje: error.message,
      valorMostrado,
      valorDocumentado: null
    }
  }
}

// Obtiene la trazabilidad de un campo específico
export const obtenerTrazabilidadPorCampo = (categoria, campo) => {
  const categoriaData = trazabilidadDatos[categoria]
  if (!categoriaData) return null

  // Manejar estructuras anidadas
  if (categoriaData[campo]) {
    return categoriaData[campo]
  }

  // Buscar en subniveles
  for (const [key, value] of Object.entries(categoriaData)) {
    if (typeof value === 'object' && value[campo]) {
      return value[campo]
    }
  }

  return null
}

// Genera un informe completo de verificación
export const generarInformeVerificacion = async () => {
  const informe = {
    fechaGeneracion: new Date().toISOString(),
    resumen: {
      totalDatos: 0,
      verificados: 0,
      errores: 0,
      pendientes: 0,
      porcentajeCoherencia: 0
    },
    porCategoria: {},
    detalles: [],
    fuentesVerificadas: []
  }

  // Verificar cada categoría de datos
  const categorias = [
    { key: 'poblacion', datos: extremaduraData2024.poblacion, trazabilidad: trazabilidadDatos.poblacion },
    { key: 'sectores', datos: extremaduraData2024.sectores, trazabilidad: trazabilidadDatos.sectores },
    { key: 'jubilacion', datos: extremaduraData2024.jubilacion, trazabilidad: trazabilidadDatos.jubilacion },
    { key: 'saludLaboral', datos: extremaduraData2024.saludLaboral, trazabilidad: trazabilidadDatos.saludLaboral },
    { key: 'bienestar', datos: extremaduraData2024.bienestar, trazabilidad: trazabilidadDatos.bienestar },
    { key: 'kpis', datos: extremaduraData2024.kpis, trazabilidad: trazabilidadDatos.kpis }
  ]

  for (const cat of categorias) {
    const resultadoCategoria = verificarCategoria(cat.key, cat.datos, cat.trazabilidad)
    informe.porCategoria[cat.key] = resultadoCategoria
    informe.resumen.totalDatos += resultadoCategoria.total
    informe.resumen.verificados += resultadoCategoria.verificados
    informe.resumen.errores += resultadoCategoria.errores
    informe.detalles.push(...resultadoCategoria.detalles)
  }

  // Verificar fuentes
  for (const [key, fuente] of Object.entries(fuentesOficiales)) {
    const verificacion = await verificarDisponibilidadURL(fuente.url)
    informe.fuentesVerificadas.push({
      codigo: key,
      nombre: fuente.nombre,
      ...verificacion
    })
  }

  // Calcular porcentaje de coherencia
  if (informe.resumen.totalDatos > 0) {
    informe.resumen.porcentajeCoherencia =
      Math.round((informe.resumen.verificados / informe.resumen.totalDatos) * 100)
  }

  return informe
}

// Verifica una categoría completa de datos
const verificarCategoria = (nombreCategoria, datos, trazabilidad) => {
  const resultado = {
    categoria: nombreCategoria,
    total: 0,
    verificados: 0,
    errores: 0,
    detalles: []
  }

  if (!datos || !trazabilidad) {
    return resultado
  }

  const procesarObjeto = (obj, traz, path = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Si es 'tasas' u otro objeto anidado en datos
        if (key === 'tasas') {
          for (const [subKey, subValue] of Object.entries(value)) {
            const trazKey = `tasa${subKey.charAt(0).toUpperCase() + subKey.slice(1)}`
            if (traz && traz[trazKey]) {
              resultado.total++
              const coherente = subValue === traz[trazKey].valor
              if (coherente) {
                resultado.verificados++
              } else {
                resultado.errores++
              }
              resultado.detalles.push({
                campo: `${currentPath}.${subKey}`,
                valorMostrado: subValue,
                valorDocumentado: traz[trazKey]?.valor,
                coherente,
                fuente: traz[trazKey]?.fuente,
                urlVerificacion: traz[trazKey]?.urlVerificacion,
                fechaExtraccion: traz[trazKey]?.fechaExtraccion
              })
            }
          }
        } else {
          // Objeto de sector u otro anidado
          const subTraz = traz?.[key]
          if (subTraz) {
            procesarObjeto(value, subTraz, currentPath)
          }
        }
      } else if (typeof value !== 'object') {
        // Valor primitivo
        const trazField = traz?.[key]
        if (trazField && trazField.valor !== undefined) {
          resultado.total++
          const coherente = value === trazField.valor
          if (coherente) {
            resultado.verificados++
          } else {
            resultado.errores++
          }
          resultado.detalles.push({
            campo: currentPath,
            valorMostrado: value,
            valorDocumentado: trazField.valor,
            coherente,
            fuente: trazField.fuente,
            urlVerificacion: trazField.urlVerificacion,
            fechaExtraccion: trazField.fechaExtraccion,
            descripcion: trazField.descripcion,
            unidad: trazField.unidad,
            notas: trazField.notas
          })
        }
      }
    }
  }

  procesarObjeto(datos, trazabilidad)

  return resultado
}

// Calcula la antigüedad de los datos
export const calcularAntiguedadDatos = (fechaExtraccion) => {
  const fecha = new Date(fechaExtraccion)
  const ahora = new Date()
  const diffTime = Math.abs(ahora - fecha)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  let estado = ESTADOS_VERIFICACION.VERIFICADO
  let mensaje = 'Datos actualizados'

  if (diffDays > 365) {
    estado = ESTADOS_VERIFICACION.DESACTUALIZADO
    mensaje = `Datos con más de 1 año de antigüedad (${Math.floor(diffDays / 365)} años)`
  } else if (diffDays > 180) {
    estado = ESTADOS_VERIFICACION.DESACTUALIZADO
    mensaje = `Datos con más de 6 meses de antigüedad (${Math.floor(diffDays / 30)} meses)`
  } else if (diffDays > 90) {
    mensaje = `Datos con ${Math.floor(diffDays / 30)} meses de antigüedad`
  }

  return {
    diasTranscurridos: diffDays,
    estado,
    mensaje
  }
}

// Obtiene todos los datos con su trazabilidad en formato plano
export const obtenerDatosConTrazabilidad = () => {
  const resultado = []

  const procesarCategoria = (categoria, nombreCategoria, datos, trazabilidad) => {
    if (!datos || !trazabilidad) return

    for (const [key, value] of Object.entries(datos)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        if (key === 'tasas') {
          for (const [subKey, subValue] of Object.entries(value)) {
            const trazKey = `tasa${subKey.charAt(0).toUpperCase() + subKey.slice(1)}`
            const traz = trazabilidad[trazKey]
            if (traz) {
              resultado.push({
                categoria: nombreCategoria,
                campo: `tasas.${subKey}`,
                valor: subValue,
                ...traz
              })
            }
          }
        } else {
          // Es un subsector
          const subTraz = trazabilidad[key]
          if (subTraz) {
            for (const [subKey, subValue] of Object.entries(value)) {
              const trazField = subTraz[subKey]
              if (trazField && trazField.valor !== undefined) {
                resultado.push({
                  categoria: nombreCategoria,
                  subcategoria: key,
                  campo: subKey,
                  valor: subValue,
                  ...trazField
                })
              }
            }
          }
        }
      } else if (typeof value !== 'object') {
        const traz = trazabilidad[key]
        if (traz) {
          resultado.push({
            categoria: nombreCategoria,
            campo: key,
            valor: value,
            ...traz
          })
        }
      }
    }
  }

  // Procesar todas las categorías
  procesarCategoria('Población', 'poblacion', extremaduraData2024.poblacion, trazabilidadDatos.poblacion)
  procesarCategoria('Sectores', 'sectores', extremaduraData2024.sectores, trazabilidadDatos.sectores)
  procesarCategoria('Jubilación', 'jubilacion', extremaduraData2024.jubilacion, trazabilidadDatos.jubilacion)
  procesarCategoria('Salud Laboral', 'saludLaboral', extremaduraData2024.saludLaboral, trazabilidadDatos.saludLaboral)
  procesarCategoria('Bienestar', 'bienestar', extremaduraData2024.bienestar, trazabilidadDatos.bienestar)
  procesarCategoria('KPIs', 'kpis', extremaduraData2024.kpis, trazabilidadDatos.kpis)

  return resultado
}

// Obtener resumen de auditoría
export const obtenerResumenAuditoria = () => {
  return {
    ...resumenAuditoria,
    fuentesOficiales: Object.entries(fuentesOficiales).map(([key, value]) => ({
      codigo: key,
      ...value
    }))
  }
}

// Exportar todas las funciones
export default {
  ESTADOS_VERIFICACION,
  verificarDisponibilidadURL,
  verificarCoherenciaDatos,
  obtenerTrazabilidadPorCampo,
  generarInformeVerificacion,
  calcularAntiguedadDatos,
  obtenerDatosConTrazabilidad,
  obtenerResumenAuditoria
}
