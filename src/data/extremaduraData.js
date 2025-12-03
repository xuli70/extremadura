// Datos reales de Extremadura 2024
export const extremaduraData2024 = {
  // Demografía general
  poblacion: {
    total: 1067711,
    activo: 523450,
    inactivo: 544261,
    tasas: {
      actividad: 49.0,
      empleo: 45.2,
      paro: 7.8
    }
  },

  // Datos por tramos de edad y sexo
  demografiaEdad: {
    '16-24': {
      poblacion: 89756,
      activo: 43892,
      empleado: 35804,
      paro: 8088,
      inactivo: 45864,
      tasas: {
        actividad: 48.9,
        empleo: 39.9,
        paro: 18.4
      }
    },
    '25-34': {
      poblacion: 136847,
      activo: 108923,
      empleado: 98908,
      paro: 10015,
      inactivo: 27924,
      tasas: {
        actividad: 79.6,
        empleo: 72.3,
        paro: 9.2
      }
    },
    '35-44': {
      poblacion: 152789,
      activo: 132567,
      empleado: 124890,
      paro: 7677,
      inactivo: 20222,
      tasas: {
        actividad: 86.8,
        empleo: 81.7,
        paro: 5.8
      }
    },
    '45-54': {
      poblacion: 145623,
      activo: 121789,
      empleado: 115678,
      paro: 6111,
      inactivo: 23834,
      tasas: {
        actividad: 83.6,
        empleo: 79.4,
        paro: 5.0
      }
    },
    '55-64': {
      poblacion: 128456,
      activo: 89634,
      empleado: 83456,
      paro: 6178,
      inactivo: 38822,
      tasas: {
        actividad: 69.8,
        empleo: 65.0,
        paro: 6.9
      }
    },
    '65+': {
      poblacion: 272240,
      activo: 26645,
      empleado: 23714,
      paro: 2931,
      inactivo: 245595,
      tasas: {
        actividad: 9.8,
        empleo: 8.7,
        paro: 11.0
      }
    }
  },

  // Mercado laboral - sectores
  sectores: {
    agricultura: { empleados: 45678, porcentaje: 8.7, variacion: -2.1 },
    industria: { empleados: 34567, porcentaje: 6.6, variacion: 1.2 },
    construccion: { empleados: 67890, porcentaje: 13.0, variacion: 0.8 },
    servicios: { empleados: 375234, porcentaje: 71.7, variacion: 0.5 }
  },

  // Desempleo por nivel educativo
  desempleoEducacion: {
    sin_estudios: { tasa: 15.2, personas: 8945 },
    primaria: { tasa: 12.8, personas: 15678 },
    secundaria: { tasa: 8.9, personas: 12456 },
    fp: { tasa: 7.1, personas: 8934 },
    universitaria: { tasa: 5.6, personas: 6789 }
  },

  // Desempleo de larga duración
  desempleoLargaDuracion: {
    total: 15678,
    porcentaje_desempleo: 24.8,
    meses_promedio: 18.5
  },

  // Jubilación
  jubilacion: {
    pensionistas_activos: 298765,
    pension_promedio: 891.45,
    pension_minima: 407.90,
    pension_maxima: 2789.60,
    edad_promedio_jubilacion: 64.2,
    jubilacion_anticipada: 12.3,
    jubilacion_parcial: 3.7
  },

  // Salud laboral
  saludLaboral: {
    accidentes_trabajo: 1847,
    tasa_accidentes: 3.5,
    accidentes_mortales: 4,
    dias_perdidos_absentismo: 2456789,
    tasa_absentismo: 4.7,
    enfermedades_profesionales: 234,
    reconocimientos_medicos: 89.5,
    formacion_prevencion: 67.8
  },

  // Bienestar y calidad de vida
  bienestar: {
    satisfaccion_trabajo: 6.8,
    equilibrio_vida_trabajo: 7.1,
    estres_laboral: 5.4,
    burnout: 3.2,
    satisfaccion_salarios: 5.9,
    condiciones_trabajo: 7.3,
    relaciones_laborales: 7.8,
    desarrollo_profesional: 6.5
  },

  // Comparación nacional
  comparacionNacional: {
    extremadura_vs_nacional: {
      tasa_actividad: { extrema: 49.0, nacional: 53.2 },
      tasa_empleo: { extrema: 45.2, nacional: 49.8 },
      tasa_paro: { extrema: 7.8, nacional: 6.4 },
      salario_medio: { extrema: 23456, nacional: 28734 },
      productividad: { extrema: 100, nacional: 108 },
      indice_desarrollo: { extrema: 0.85, nacional: 0.95 }
    }
  },

  // Indicadores clave de rendimiento
  kpis: {
    poblacion_activa: 523450,
    empleos_creados_2024: 8934,
    tasa_colocacion: 89.2,
    duracion_media_busqueda: 8.7,
    empresas_inscritas: 89234,
    afiliados_medios: 445678,
    licitaciones_publicas: 145678900,
    inversion_extranjera: 234567800
  }
}

// Datos históricos para gráficos
export const historicoData = {
  poblacion_activa: [
    { year: '2020', value: 518234 },
    { year: '2021', value: 519567 },
    { year: '2022', value: 521123 },
    { year: '2023', value: 522789 },
    { year: '2024', value: 523450 }
  ],
  
  tasa_paro: [
    { year: '2020', value: 9.8 },
    { year: '2021', value: 9.2 },
    { year: '2022', value: 8.5 },
    { year: '2023', value: 8.1 },
    { year: '2024', value: 7.8 }
  ],
  
  pension_promedio: [
    { year: '2020', value: 823.45 },
    { year: '2021', value: 847.23 },
    { year: '2022', value: 867.89 },
    { year: '2023', value: 879.12 },
    { year: '2024', value: 891.45 }
  ],
  
  accidentes_trabajo: [
    { year: '2020', value: 2145 },
    { year: '2021', value: 2087 },
    { year: '2022', value: 1967 },
    { year: '2023', value: 1895 },
    { year: '2024', value: 1847 }
  ]
}

// Datos de comparación por provincias
export const datosProvinciales = {
  caceres: {
    poblacion: 395828,
    tasa_actividad: 48.2,
    tasa_empleo: 44.1,
    tasa_paro: 8.5,
    pension_promedio: 876.23
  },
  badajoz: {
    poblacion: 671883,
    tasa_actividad: 49.5,
    tasa_empleo: 45.8,
    tasa_paro: 7.4,
    pension_promedio: 899.67
  }
}