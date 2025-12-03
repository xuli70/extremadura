#!/usr/bin/env python3
"""
Servidor para Dashboard Extremadura Móvil
Puerto: 9876
"""
import http.server
import socketserver
import os
import sys
import threading
import time
from pathlib import Path

class DashboardRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path(__file__).parent / "public"), **kwargs)
    
    def do_GET(self):
        # Get the path without query parameters
        path = self.path.split('?')[0]
        
        # Check for static files
        static_extensions = ('.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.json', '.woff', '.woff2', '.ttf', '.map')
        
        # If it's a static file, check if it exists
        if any(path.endswith(ext) for ext in static_extensions):
            file_path = self.translate_path(path)
            if os.path.exists(file_path) and os.path.isfile(file_path):
                super().do_GET()
                return
        
        # For any other path (including React Router routes), serve index.html
        # This handles all SPA routing
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Service-Worker-Allowed', '/')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.end_headers()
        
        # Read and serve index.html
        index_path = Path(__file__).parent / "public" / "index.html"
        if index_path.exists():
            with open(index_path, 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.wfile.write(b'<h1>Dashboard no disponible</h1>')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def log_message(self, format, *args):
        timestamp = time.strftime('%H:%M:%S')
        print(f"[{timestamp}] {self.address_string()} - {format % args}")

def start_server():
    """Start the dashboard server"""
    public_dir = Path(__file__).parent / "public"
    
    # Ensure index.html points to standalone version
    standalone_file = public_dir / "index-standalone.html"
    index_file = public_dir / "index.html"
    
    if standalone_file.exists():
        try:
            if index_file.exists():
                index_file.unlink()
            index_file.hardlink_to(standalone_file)
            print("✅ Enlazado index.html -> index-standalone.html")
        except:
            # If hardlink fails, just copy the file
            import shutil
            shutil.copy2(standalone_file, index_file)
            print("✅ Copiado index.html desde standalone")
    
    port = 9876
    try:
        with socketserver.TCPServer(("", port), DashboardRequestHandler) as httpd:
            print("=" * 60)
            print("🚀 DASHBOARD EXTREMADURA MÓVIL")
            print("=" * 60)
            print(f"✅ Servidor iniciado en http://localhost:{port}")
            print("📱 Aplicación móvil React con datos reales 2024")
            print("⚡ PWA habilitada (instalable, offline)")
            print("🎯 Soporte completo React Router")
            print("📊 8 páginas con visualizaciones Recharts")
            print("=" * 60)
            print("🔗 ENLACES DIRECTOS:")
            print(f"   • Página principal: http://localhost:{port}")
            print(f"   • Mercado Laboral: http://localhost:{port}/mercado-laboral")
            print(f"   • Salud Laboral: http://localhost:{port}/salud-laboral")
            print(f"   • Jubilación: http://localhost:{port}/jubilacion")
            print(f"   • Bienestar: http://localhost:{port}/bienestar")
            print(f"   • KPIs: http://localhost:{port}/kpis")
            print(f"   • Comparaciones: http://localhost:{port}/comparaciones")
            print("=" * 60)
            print("💡 Para detener: Ctrl+C")
            print("=" * 60)
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido por el usuario")
    except Exception as e:
        print(f"❌ Error al iniciar servidor: {e}")
        sys.exit(1)

if __name__ == '__main__':
    start_server()