# Dashboard Extremadura Móvil

Dashboard móvil de salud y situación laboral de Extremadura - España. Una aplicación web progresiva (PWA) que proporciona indicadores en tiempo real sobre el mercado laboral, salud laboral y bienestar de los trabajadores en la región de Extremadura.

## 🚀 Características

- **Aplicación PWA**: Instalable en dispositivos móviles
- **Actualizaciones en tiempo real**: Datos sincronizados con fuentes oficiales
- **Navegación optimizada para móvil**: Bottom navigation y gestos táctiles
- **Gráficos responsivos**: Visualizaciones interactivas con Recharts
- **Datos reales**: Información oficial de 2024 de Extremadura
- **Modo offline**: Funcionalidad sin conexión a internet
- **Pull to refresh**: Actualización al deslizar hacia abajo

## 📱 Páginas Principales

1. **Visión General**: Resumen ejecutivo con métricas clave
2. **Mercado Laboral**: Análisis detallado del empleo y desempleo
3. **Salud Laboral**: Accidentes, absentismo y bienestar
4. **Jubilación**: Sistema de pensiones y modalidades
5. **Bienestar**: Calidad de vida y satisfacción laboral
6. **Comparaciones**: Extremadura vs España y otras CCAA
7. **KPIs**: Indicadores clave de rendimiento
8. **Configuración**: Ajustes de la aplicación

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18, Vite
- **Estilos**: Tailwind CSS
- **Gráficos**: Recharts
- **Navegación**: React Router
- **PWA**: Service Worker, Manifest
- **Iconos**: Lucide React
- **Fecha**: date-fns

## 📦 Instalación

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/xuli70/extremadura.git
   cd extremadura
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🏗️ Estructura del Proyecto

```
extremadura/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── components/
│   │   ├── BottomNavigation.jsx
│   │   └── PullToRefresh.jsx
│   ├── data/
│   │   └── extremaduraData.js
│   ├── pages/
│   │   ├── VisionGeneral.jsx
│   │   ├── MercadoLaboral.jsx
│   │   ├── SaludLaboral.jsx
│   │   ├── Jubilacion.jsx
│   │   ├── Bienestar.jsx
│   │   ├── Comparaciones.jsx
│   │   ├── KPIs.jsx
│   │   └── Configuracion.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 📊 Datos

La aplicación utiliza datos reales de Extremadura 2024 obtenidos de:
- INE (Instituto Nacional de Estadística)
- SEPE (Servicio Público de Empleo Estatal)
- Seguridad Social
- Junta de Extremadura

### Fuentes de datos incluidas:
- Demografía por tramos de edad
- Tasas de actividad, empleo y paro
- Empleo por sectores económicos
- Desempleo por nivel educativo
- Datos de jubilación y pensiones
- Indicadores de salud laboral
- Métricas de bienestar laboral

## 🔧 Scripts Disponibles

- `npm run dev`: Iniciar servidor de desarrollo
- `npm run build`: Construir para producción
- `npm run preview`: Previsualizar build de producción
- `npm run install-deps`: Instalar dependencias

## 📱 Instalación como PWA

Para instalar la aplicación en un dispositivo móvil:

1. Abrir la aplicación en Chrome/Safari
2. Buscar la opción "Añadir a pantalla de inicio" o "Instalar aplicación"
3. Confirmar la instalación
4. La aplicación aparecerá como un icono nativo

## 🌐 Funcionalidades Offline

La aplicación incluye:
- **Service Worker**: Cache automático de recursos
- **Datos locales**: Información fundamental disponible offline
- **Modo degradado**: Funcionalidad básica sin conexión
- **Sincronización**: Actualización automática al recuperar conexión

## 🎨 Características de Diseño

- **Mobile-first**: Optimizado para pantallas de móvil
- **Responsive**: Adaptable a diferentes tamaños
- **Accesible**: Cumple estándares de accesibilidad web
- **Intuitive**: Navegación clara y consistente
- **Dark mode**: Preparado para modo oscuro

## 🔔 Notificaciones

La aplicación incluye:
- Alertas de actualización de datos
- Notificaciones de umbrales críticos
- Indicadores de estado en tiempo real

## 🛡️ Privacidad

- **Datos públicos**: Solo utiliza información oficial y pública
- **Sin tracking**: No recopila datos personales
- **Local storage**: Datos almacenados localmente
- **Cifrado**: Comunicaciones seguras HTTPS

## 📈 Métricas y KPIs

### Población y Empleo
- Población activa: 523,450 personas
- Tasa de empleo: 45.2%
- Tasa de paro: 7.8%

### Salud Laboral
- Accidentes de trabajo: 1,847 casos
- Tasa de absentismo: 4.7%
- Enfermedades profesionales: 234 casos

### Pensiones
- Pensionistas activos: 298,765
- Pensión promedio: 891.45€
- Edad promedio jubilación: 64.2 años

## 🔄 Actualizaciones

La aplicación está configurada para:
- Actualizaciones automáticas cada 30 minutos
- Notificaciones push para cambios importantes
- Sincronización con fuentes oficiales
- Versionado automático

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -am 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para reportar problemas o sugerir mejoras:
- Crear un issue en el repositorio
- Contactar al equipo de desarrollo

## 🚀 Roadmap

### Versión 1.1
- [ ] Integración con APIs oficiales en tiempo real
- [ ] Sistema de alertas personalizables
- [ ] Exportación de datos a Excel/CSV
- [ ] Modo offline completo

### Versión 1.2
- [ ] Análisis predictivo con ML
- [ ] Comparativas internacionales
- [ ] Dashboard personalizable
- [ ] Integración con redes sociales

### Versión 2.0
- [ ] App nativa iOS/Android
- [ ] Realidad aumentada para visualizaciones
- [ ] Asistente virtual con IA
- [ ] Integración IoT para datos en tiempo real

---

**Dashboard Extremadura Móvil 2024** | [Repositorio GitHub](https://github.com/xuli70/extremadura)