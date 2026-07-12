#!/usr/bin/env python3

"""Start the Argus backend and Expo web frontend together."""

from __future__ import annotations

import os
import signal
import subprocess
import sys
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parent
BACKEND_DIR = ROOT / "backend"
GUI_DIR = ROOT / "argus-gui"


def python_executable() -> str:
    root_env_python = ROOT / ".argus_env" / "bin" / "python"
    if root_env_python.exists():
        return str(root_env_python)
    return sys.executable


def start_process(label: str, command: list[str], cwd: Path, env: dict[str, str]) -> subprocess.Popen:
    print(f"Starting {label}: {' '.join(command)}")
    return subprocess.Popen(command, cwd=str(cwd), env=env)


def expo_web_command() -> list[str]:
    return ["yarn", "expo", "start", "--web"]


def main() -> int:
    python_exe = python_executable()

    backend_env = os.environ.copy()
    backend_env.setdefault("DJANGO_SETTINGS_MODULE", "argus_api.settings")

    gui_env = os.environ.copy()
    gui_env.setdefault("EXPO_PUBLIC_BACKEND_HOST", "127.0.0.1")
    gui_env.setdefault("EXPO_PUBLIC_BACKEND_PORT", "8000")

    print("Running backend migrations...")
    migrate = subprocess.run(
        [python_exe, "manage.py", "migrate", "--noinput"],
        cwd=str(BACKEND_DIR),
        env=backend_env,
    )
    if migrate.returncode != 0:
        return migrate.returncode

    processes: list[subprocess.Popen] = []
    processes.append(
        start_process(
            "Django backend",
            [python_exe, "manage.py", "runserver", "0.0.0.0:8000"],
            BACKEND_DIR,
            backend_env,
        )
    )
    processes.append(
        start_process(
            "Expo web frontend",
            expo_web_command(),
            GUI_DIR,
            gui_env,
        )
    )

    def shutdown(*_: object) -> None:
        for process in processes:
            if process.poll() is None:
                process.terminate()

    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    try:
        while True:
            for process in processes:
                exit_code = process.poll()
                if exit_code is not None:
                    print(f"{process.args[0]} exited with code {exit_code}; stopping the stack.")
                    return exit_code
            time.sleep(1)
    finally:
        shutdown()


if __name__ == "__main__":
    raise SystemExit(main())