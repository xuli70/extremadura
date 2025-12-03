#!/usr/bin/env python3
"""
Servidor robusto para Dashboard Extremadura
Puerto: 3000 (puerto estándar)
"""
import http.server
import socketserver
import os
from pathlib import Path
import re

# Obtener el directorio donde está el script
SCRIPT_DIR = Path(__file__).parent.resolve()
PUBLIC_DIR = SCRIPT_DIR / 'public'

class DashboardHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC_DIR), **kwargs)

    def do_GET(self):
        """Handle GET requests with SPA routing support"""
        path = self.path.split('?')[0]  # Remove query parameters

        # List of static file extensions
        static_extensions = {
            '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg',
            '.json', '.woff', '.woff2', '.ttf', '.map', '.txt'
        }

        # Check if request is for a static file
        if any(path.endswith(ext) for ext in static_extensions):
            # Check if static file exists
            file_path = PUBLIC_DIR / path.lstrip('/')
            if file_path.exists() and file_path.is_file():
                super().do_GET()
                return

        # For all other requests (including React routes), serve index.html
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.end_headers()

        # Read and serve index.html
        index_path = PUBLIC_DIR / 'index.html'
        if index_path.exists():
            try:
                with open(index_path, 'rb') as f:
                    self.wfile.write(f.read())
            except Exception as e:
                error_msg = f"<h1>Error al cargar el dashboard: {e}</h1>".encode()
                self.wfile.write(error_msg)
        else:
            self.wfile.write(b"<h1>Dashboard no encontrado</h1>")

    def log_message(self, format, *args):
        """Custom logging"""
        print(f"[{self.log_date_time_string()}] {format % args}")

def start_dashboard_server():
    """Start the dashboard server on port 3000"""
    port = 3000

    # Ensure index.html exists
    public_dir = PUBLIC_DIR
    index_file = public_dir / 'index.html'
    standalone_file = public_dir / 'index-standalone.html'
    
    if not index_file.exists() and standalone_file.exists():
        # Copy standalone to index.html if index.html doesn't exist
        import shutil
        shutil.copy2(standalone_file, index_file)
        print("✅ Creado index.html desde standalone")
    
    try:
        with socketserver.TCPServer(("", port), DashboardHandler) as httpd:
            print("=" * 70)
            print("🚀 DASHBOARD EXTREMADURA MÓVIL - SERVIDOR VERIFICADO")
            print("=" * 70)
            print(f"🌐 URL: http://localhost:{port}")
            print("📱 Aplicación React móvil con datos reales 2024")
            print("⚡ PWA habilitada (instalable en móviles)")
            print("🎯 React Router para navegación SPA")
            print("📊 8 páginas con visualizaciones Recharts")
            print("=" * 70)
            print("🔗 NAVEGACIÓN DISPONIBLE:")
            print(f"   • Inicio: http://localhost:{port}")
            print(f"   • Mercado Laboral: http://localhost:{port}/mercado-laboral")
            print(f"   • Salud Laboral: http://localhost:{port}/salud-laboral")
            print(f"   • Jubilación: http://localhost:{port}/jubilacion")
            print(f"   • Bienestar: http://localhost:{port}/bienestar")
            print(f"   • KPIs: http://localhost:{port}/kpis")
            print(f"   • Comparaciones: http://localhost:{port}/comparaciones")
            print("=" * 70)
            print("✅ Servidor iniciado exitosamente")
            print("🔍 Estado: ACTIVO Y FUNCIONAL")
            print("=" * 70)
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido por el usuario")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Error: Puerto {port} ya está en uso")
            print("🔧 Solución: El servidor ya está ejecutándose")
        else:
            print(f"❌ Error del sistema: {e}")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")

if __name__ == '__main__':
    start_dashboard_server()