#!/usr/bin/env python3
"""
Servidor SPA para Dashboard Extremadura - Puerto 8000
Maneja todas las rutas como index.html para React Router
"""
import http.server
import socketserver
import os
from pathlib import Path
import mimetypes

class SPAServer(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        # Get request path
        path = self.path.split('?')[0]
        
        # Static file extensions
        static_files = {
            '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', 
            '.json', '.woff', '.woff2', '.ttf', '.map', '.txt'
        }
        
        # Determine file path
        if path == '/':
            file_path = Path(__file__).parent / "public" / "index.html"
        elif any(path.endswith(ext) for ext in static_files):
            file_path = Path(__file__).parent / "public" / path.lstrip('/')
        else:
            # For React Router routes, serve index.html
            file_path = Path(__file__).parent / "public" / "index.html"
        
        # Check if file exists
        if file_path.exists() and file_path.is_file():
            self.send_response(200)
            
            # Set content type
            if str(file_path).endswith('.html'):
                content_type = 'text/html'
            elif str(file_path).endswith('.js'):
                content_type = 'application/javascript'
            elif str(file_path).endswith('.css'):
                content_type = 'text/css'
            elif str(file_path).endswith('.json'):
                content_type = 'application/json'
            else:
                content_type = mimetypes.guess_type(str(file_path))[0] or 'application/octet-stream'
            
            self.send_header('Content-Type', content_type)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.send_header('Service-Worker-Allowed', '/')
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.end_headers()
            
            # Read and send file content
            try:
                with open(file_path, 'rb') as f:
                    self.wfile.write(f.read())
            except Exception as e:
                self.wfile.write(f"Error reading file: {e}".encode())
        else:
            # File not found
            self.send_error(404, "File not found")
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def log_message(self, format, *args):
        print(f"🌐 {self.address_string()} - {format % args}")

def main():
    # Ensure we have index.html
    public_dir = Path(__file__).parent / "public"
    index_file = public_dir / "index.html"
    standalone_file = public_dir / "index-standalone.html"
    
    if standalone_file.exists() and not index_file.exists():
        import shutil
        shutil.copy2(standalone_file, index_file)
        print("✅ Creado index.html desde standalone")
    
    port = 8000
    try:
        with socketserver.TCPServer(("", port), SPAServer) as httpd:
            print("=" * 60)
            print("🚀 DASHBOARD EXTREMADURA MÓVIL - SERVIDOR SPA")
            print("=" * 60)
            print(f"✅ http://localhost:{port}")
            print("📱 React + Recharts + PWA")
            print("🎯 React Router habilitado")
            print("📊 Datos reales Extremadura 2024")
            print("=" * 60)
            print("🔗 PÁGINAS DISPONIBLES:")
            print(f"   • http://localhost:{port}/")
            print(f"   • http://localhost:{port}/mercado-laboral")
            print(f"   • http://localhost:{port}/salud-laboral")
            print(f"   • http://localhost:{port}/jubilacion")
            print(f"   • http://localhost:{port}/bienestar")
            print(f"   • http://localhost:{port}/kpis")
            print(f"   • http://localhost:{port}/comparaciones")
            print("=" * 60)
            print("💡 Para detener: Ctrl+C")
            print("=" * 60)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == '__main__':
    main()