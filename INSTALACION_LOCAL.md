# Dashboard Móvil Extremadura - Instalación Local

Este archivo contiene las instrucciones completas para instalar y ejecutar el Dashboard Móvil de Extremadura en tu ordenador local.

## 📋 Requisitos Previos

- **Python 3.7 o superior** (para el servidor local)
- **Node.js 16 o superior** (opcional, solo si quieres desarrollar)
- **Navegador web moderno** (Chrome, Firefox, Safari, Edge)

## 🚀 Instalación y Ejecución

### Opción 1: Servidor Python Simple

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/xuli70/extremadura.git
   ```

2. **Abrir terminal en la carpeta del proyecto**
   ```bash
   cd extremadura
   ```

3. **Ejecutar el servidor Python**
   ```bash
   python3 verified_server.py
   # O si tienes python como alias
   python verified_server.py
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Opción 2: Servidor Vite (Recomendado para desarrollo)

Si quieres usar el servidor de desarrollo con recarga automática:

1. **Clonar el repositorio** (si no lo has hecho)
   ```bash
   git clone https://github.com/xuli70/extremadura.git
   cd extremadura
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o si usas yarn
   yarn install
   ```

2. **Ejecutar servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

3. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📱 Funcionalidades del Dashboard

El dashboard incluye las siguientes páginas:

1. **🏠 Visión General** - Resumen ejecutivo con KPIs principales
2. **💼 Mercado Laboral** - Análisis del empleo en Extremadura
3. **🏥 Salud Laboral** - Indicadores de salud y seguridad
4. **👥 Jubilación** - Datos sobre envejecimiento y pensiones
5. **😊 Bienestar** - Indicadores de calidad de vida
6. **📊 KPIs** - Métricas clave de rendimiento
7. **📈 Comparaciones** - Análisis comparativo con otras regiones
8. **⚙️ Configuración** - Ajustes y personalizaciones

## 📲 Características PWA

La aplicación es una **Progressive Web App (PWA)** que permite:

- **Instalación en dispositivos móviles** (como una app nativa)
- **Funcionamiento offline** una vez cargada
- **Recarga de contenido** al volver a tener conexión
- **Iconos de aplicación** para escritorio y móvil

## 🔧 Archivos Incluidos

- `verified_server.py` - Servidor Python recomendado para producción
- `spa_server.py` - Servidor alternativo para SPA
- `serve.py` - Servidor básico con routing
- `server_app.py` - Servidor adicional
- `public/index-standalone.html` - Versión standalone completa
- `public/` - Archivos estáticos (iconos, manifest, service worker)
- `src/` - Código fuente React completo
- `package.json` - Configuración y dependencias
- `vite.config.js` - Configuración de Vite
- `tailwind.config.js` - Configuración de Tailwind CSS

## 🐛 Solución de Problemas

### Error "Address already in use"
```bash
# Encontrar y terminar procesos en puerto 3000
lsof -ti:3000 | xargs kill -9
# O en Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error de conexión
1. Verifica que el servidor esté ejecutándose
2. Comprueba que no hay firewall bloqueando
3. Asegúrate de usar `http://localhost:3000` (no https)

### Problemas con gráficos
- Los gráficos se cargan desde CDN, asegúrate de tener conexión a internet
- En dispositivos móviles, permite las conexiones externas

## 📝 Notas Técnicas

- **Framework**: React 18 con Vite
- **Estilos**: Tailwind CSS
- **Gráficos**: Recharts
- **Routing**: React Router v6
- **PWA**: Service Worker para cacheo
- **Responsivo**: Diseño optimizado para móvil y escritorio

## 🔗 Repositorio

- **GitHub**: https://github.com/xuli70/extremadura

---

**Dashboard Extremadura Móvil 2024**
*Aplicación móvil responsive con datos de salud y mercado laboral*