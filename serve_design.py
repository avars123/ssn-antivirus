from __future__ import annotations

import http.server
import os
import socketserver
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).resolve().parent
DIST_DIR = ROOT / "dist"
DEFAULT_PORT = int(os.environ.get("PORT", "4173"))


class SPARequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, directory: Optional[str] = None, **kwargs):
        super().__init__(*args, directory=str(DIST_DIR), **kwargs)

    def log_message(self, format: str, *args) -> None:  # noqa: A003
        # Keep console output concise for the single-file experience.
        return

    def do_GET(self) -> None:  # noqa: N802
        if self.path != "/" and (DIST_DIR / self.path.lstrip("/")).exists():
            return super().do_GET()

        # Fallback to index.html for SPA routing or missing asset requests.
        self.path = "/index.html"
        return super().do_GET()


def main() -> None:
    if not DIST_DIR.exists():
        raise SystemExit(
            "Design assets are missing. Run 'npm install' then 'npm run build' "
            "to generate the dist/ folder before starting the server."
        )

    handler = SPARequestHandler
    with socketserver.TCPServer(("0.0.0.0", DEFAULT_PORT), handler) as httpd:
        print(f"Serving SSN Antivirus design at http://localhost:{DEFAULT_PORT}")
        print("Press Ctrl+C to stop the server.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")


if __name__ == "__main__":
    main()
