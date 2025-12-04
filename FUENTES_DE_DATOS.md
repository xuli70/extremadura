# Fuentes de Datos y Trazabilidad - Dashboard Extremadura

## Estado de Verificación

| Categoría | Verificados | Pendientes | Total |
|-----------|-------------|------------|-------|
| Demografía | 4 | 8 | 12 |
| Pensiones | 8 | 6 | 14 |
| Empleo | 0 | 18 | 18 |
| Otros | 0 | 54 | 54 |
| **TOTAL** | **12** | **86** | **98** |

**Estado general**: Parcialmente verificado (12.2%)

---

## Datos Verificados (con enlaces funcionales)

### 1. Población (INE)

| Dato | Valor | Fuente | Verificación |
|------|-------|--------|--------------|
| Población Badajoz | 669.943 | INE 2021 | [Tabla 2852](https://www.ine.es/jaxiT3/Tabla.htm?t=2852) |
| Población Cáceres | 389.558 | INE 2021 | [Tabla 2852](https://www.ine.es/jaxiT3/Tabla.htm?t=2852) |
| Población Extremadura | 1.059.501 | INE 2021 | Suma de provincias |

**Cómo verificar**:
1. Acceder a la tabla 2852
2. Seleccionar provincias 06-Badajoz y 10-Cáceres
3. Ver datos del año más reciente

### 2. Tasa de Paro (INE - EPA)

| Dato | Valor | Período | Verificación |
|------|-------|---------|--------------|
| Tasa paro Extremadura | 16,60% | 2025-T1 | [Nota de prensa EPA](https://www.ine.es/dyngs/Prensa/EPA1T25.htm) |

**Cómo verificar**:
1. Acceder a la nota de prensa EPA más reciente
2. Buscar "Extremadura" en la tabla de tasas por CCAA
3. Extremadura registra la tasa más alta de España

### 3. Pensiones (Seguridad Social)

| Dato | Valor | Período | Verificación |
|------|-------|---------|--------------|
| Total pensiones Extremadura | 246.197 | Nov 2024 | [Portal EST84](https://www.seg-social.es/wps/portal/wss/internet/EstadisticasPresupuestosEstudios/Estadisticas/EST50/EST53/EST84) |
| Pensión media Extremadura | 1.113,44€ | Nov 2024 | Portal EST84 |
| Total pensiones Badajoz | 145.151 | Nov 2024 | Portal EST84 - Badajoz.pdf |
| Pensión media Badajoz | 1.119,35€ | Nov 2024 | Portal EST84 |
| Total pensiones Cáceres | 101.046 | Nov 2024 | Portal EST84 - Cáceres.pdf |
| Pensión media Cáceres | 1.104,97€ | Nov 2024 | Portal EST84 |

**Cómo verificar**:
1. Acceder al portal EST84 de la Seguridad Social
2. Descargar PDF o Excel de Extremadura, Badajoz o Cáceres
3. Los archivos se actualizan mensualmente (última: 04/02/2025)

#### Desglose por tipo de pensión (Extremadura - Nov 2024)

| Tipo | Pensiones | Media |
|------|-----------|-------|
| Jubilación | 144.386 | 1.278,82€ |
| Viudedad | 59.077 | 856,10€ |
| Incapacidad | 31.409 | 946,47€ |
| Orfandad | 9.131 | 522,48€ |
| Favor familiar | 2.186 | 692,47€ |

---

## Datos Pendientes de Verificación

Los siguientes datos se muestran en el dashboard pero **requieren verificación manual**:

### Empleo por sectores
- **Fuente**: INE - EPA Tabla 4128
- **URL**: https://www.ine.es/jaxiT3/Tabla.htm?t=4128
- **Instrucciones**: Seleccionar CCAA > Extremadura > Sector económico
- **Estado**: PENDIENTE

### Desempleo por nivel educativo
- **Fuente**: INE - EPA
- **URL**: https://www.ine.es/jaxiT3/Tabla.htm?t=6393
- **Instrucciones**: Seleccionar nivel de formación y CCAA
- **Estado**: PENDIENTE

### Accidentes laborales
- **Fuente**: MITES
- **URL**: https://www.mites.gob.es/estadisticas/eat/welcome.htm
- **Instrucciones**: Descargar Excel mensual y filtrar por Extremadura
- **Estado**: PENDIENTE

### Indicadores de bienestar
- **Fuente**: INE - Encuesta de Condiciones de Vida
- **Estado**: NO DISPONIBLE POR CCAA
- **Nota**: Los datos mostrados son estimaciones nacionales, no específicos de Extremadura

---

## Guía de Verificación Manual

### INE - Tablas interactivas

Las tablas del INE requieren selección manual de filtros:

1. **Códigos de Extremadura**:
   - CCAA: 11 - Extremadura
   - Provincia Badajoz: 06
   - Provincia Cáceres: 10

2. **Tablas útiles**:
   | Tabla | Contenido |
   |-------|-----------|
   | 2852 | Población por provincias |
   | 3996 | Tasas por provincia |
   | 4247 | Tasas paro por CCAA (histórica) |
   | 4128 | Empleo por sector y CCAA |

3. **Notas de prensa EPA**: https://www.ine.es/prensa/epa_tabla.htm
   - Se publican trimestralmente
   - Contienen datos por CCAA en formato más accesible

### Seguridad Social

1. Acceder a: https://www.seg-social.es/wps/portal/wss/internet/EstadisticasPresupuestosEstudios/Estadisticas/EST50/EST53/EST84
2. Descargar archivos disponibles:
   - Extremadura.pdf / Extremadura.xls
   - Badajoz.pdf / Badajoz.xls
   - Cáceres.pdf / Cáceres.xls
3. Actualización mensual

### MITES - Movimiento Laboral Registrado

1. Acceder a: https://www.mites.gob.es/es/estadisticas/mercado_trabajo/MLR/welcome.htm
2. Descargar Excel del mes deseado
3. Filtrar por código territorial 11 (Extremadura)

---

## Discrepancias Detectadas

| Dato en Dashboard | Valor mostrado | Valor real verificado | Acción |
|-------------------|----------------|----------------------|--------|
| Tasa de paro | 7,8% | 16,60% | **ACTUALIZAR** |
| Total pensionistas | 298.765 | 246.197 | **ACTUALIZAR** |
| Pensión media | 891,45€ | 1.113,44€ | **ACTUALIZAR** |

**IMPORTANTE**: Los datos del dashboard necesitan ser actualizados con los valores verificados.

---

## Arquitectura de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    FUENTES OFICIALES                         │
├─────────────────┬──────────────────┬────────────────────────┤
│       INE       │  Seguridad Social │        MITES          │
│  (tablas/EPA)   │    (EST84)        │   (Excel MLR)         │
└────────┬────────┴────────┬─────────┴──────────┬─────────────┘
         │                 │                     │
         ▼                 ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│              trazabilidadData.js                             │
│   (metadatos + URLs verificación + estado verificación)      │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│              extremaduraData.js                              │
│          (datos mostrados en dashboard)                      │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│              Panel de Trazabilidad                           │
│   (Configuración > Trazabilidad en la aplicación)            │
└─────────────────────────────────────────────────────────────┘
```

---

## Recomendaciones

### Para mejorar la trazabilidad:

1. **Actualización trimestral**: Sincronizar con publicaciones de la EPA del INE
2. **Actualización mensual de pensiones**: Descargar datos de EST84 cada mes
3. **Automatización futura**: Implementar conexión a API del INE para datos EPA

### Datos que NO se pueden verificar por CCAA:

- Indicadores de bienestar laboral
- Satisfacción con el trabajo
- Estrés laboral y burnout

Estos datos provienen de encuestas nacionales sin desglose regional.

---

## Enlaces de Verificación Rápida

| Fuente | Enlace | Última actualización |
|--------|--------|----------------------|
| INE - Notas EPA | [Ver](https://www.ine.es/prensa/epa_tabla.htm) | Trimestral |
| INE - Población | [Ver](https://www.ine.es/jaxiT3/Tabla.htm?t=2852) | Anual |
| Seg. Social EST84 | [Ver](https://www.seg-social.es/wps/portal/wss/internet/EstadisticasPresupuestosEstudios/Estadisticas/EST50/EST53/EST84) | Mensual |
| MITES - MLR | [Ver](https://www.mites.gob.es/es/estadisticas/mercado_trabajo/MLR/welcome.htm) | Mensual |

---

*Última actualización de este documento: 4 Diciembre 2024*
*Próxima revisión programada: 15 Enero 2025*
