#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys
from pathlib import Path

class SPAHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path(__file__).parent / "public"), **kwargs)
    
    def do_GET(self):
        path = self.path.split('?')[0]  # Remove query parameters
        
        # Static files that should be served normally
        static_extensions = ('.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.json', '.woff', '.woff2', '.ttf')
        
        # Check if it's a static file that exists
        if any(path.endswith(ext) for ext in static_extensions):
            translated_path = self.translate_path(path)
            if os.path.exists(translated_path) and os.path.isfile(translated_path):
                super().do_GET()
                return
        
        # For root path or React Router routes, serve index.html
        if path == '/' or not any(path.endswith(ext) for ext in static_extensions):
            # Override the path to serve index.html for all non-static requests
            original_path = self.path
            self.path = '/index.html'
            super().do_GET()
            # Restore original path for logging
            self.path = original_path
            return
        
        # If we get here, it's a static file that doesn't exist
        self.send_error(404, "File not found")
    
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        
        # PWA headers
        self.send_header('Service-Worker-Allowed', '/')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def log_message(self, format, *args):
        # Custom log format
        print(f"🌐 {self.address_string()} - {format % args}")

def main():
    # Change to public directory
    public_dir = Path(__file__).parent / "public"
    os.chdir(public_dir)
    
    # Ensure index.html points to the standalone version
    standalone_file = public_dir / "index-standalone.html"
    index_file = public_dir / "index.html"
    
    if standalone_file.exists():
        if index_file.exists():
            index_file.unlink()
        index_file.symlink_to(standalone_file)
        print("✅ Configurado index.html -> index-standalone.html")
    
    try:
        with socketserver.TCPServer(("", 9000), SPAHTTPRequestHandler) as httpd:
            print("🚀 Servidor iniciado en http://localhost:9000")
            print("📱 Dashboard Extremadura Móvil disponible")
            print("⚡ PWA habilitada con Service Worker")
            print("⚡ Soporte completo para React Router")
            print("🔄 Para detener el servidor: Ctrl+C")
            print("=" * 50)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error al iniciar el servidor: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()