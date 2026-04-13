from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path


PROJECT_DIR = Path(__file__).resolve().parent


def require_command(name: str) -> None:
    if shutil.which(name) is None:
        print(
            f"No se ha encontrado '{name}' en el PATH.\n"
            "Instala Node.js LTS y abre una nueva terminal de Anaconda antes de volver a intentarlo."
        )
        sys.exit(1)


def run_command(command: list[str]) -> None:
    subprocess.run(command, cwd=PROJECT_DIR, check=True)


def main() -> None:
    print("Iniciando Lynx Racing Spain Team...")
    require_command("node")
    require_command("npm")

    node_modules = PROJECT_DIR / "node_modules"
    if not node_modules.exists():
        print("Dependencias no encontradas. Ejecutando 'npm install'...")
        run_command(["npm", "install"])

    print("Arrancando servidor de desarrollo...")
    print("Abre normalmente: http://localhost:5173")
    print("Si ese puerto estuviera ocupado, Vite mostrara otra URL en esta misma terminal.")
    run_command(["npm", "run", "dev"])


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as exc:
        print(f"\nEl comando fallo con codigo de salida {exc.returncode}.")
        sys.exit(exc.returncode)
    except KeyboardInterrupt:
        print("\nServidor detenido.")
        sys.exit(0)
