"""
Console-only reimplementation of the SSN Antivirus UI written in TypeScript.

This single-file Python 3.13 script gives a lightweight, text-based experience
with the same core screens: dashboard, scanner, quarantine, and settings.
"""
from __future__ import annotations

import random
import sys
import textwrap
import time
from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class ScanHistoryEntry:
    scan_type: str
    files_scanned: int
    threats_found: int
    duration_seconds: float

    def summary(self) -> str:
        minutes, seconds = divmod(int(self.duration_seconds), 60)
        duration = f"{minutes} мин {seconds:02d} сек" if minutes else f"{seconds} сек"
        return (
            f"{self.scan_type.title():<18} | Файлов: {self.files_scanned:,}"
            f" | Угроз: {self.threats_found} | Время: {duration}"
        )


@dataclass
class Threat:
    name: str
    severity: str
    time_seen: str
    status: str


@dataclass
class QuarantinedItem:
    name: str
    threat: str
    path: str
    date: str
    size: str
    risk: str


@dataclass
class Settings:
    realtime_protection: bool = True
    cloud_signatures: bool = True
    scheduled_scan: bool = False
    scheduled_scan_time: str = "02:00"

    def toggles(self) -> Dict[str, bool]:
        return {
            "realtime_protection": self.realtime_protection,
            "cloud_signatures": self.cloud_signatures,
            "scheduled_scan": self.scheduled_scan,
        }


class AntivirusCLI:
    def __init__(self) -> None:
        self.settings = Settings()
        self.recent_threats: List[Threat] = [
            Threat("Malware.Generic.2024", "high", "2 мин назад", "quarantined"),
            Threat("Adware.Installer", "medium", "1 час назад", "removed"),
            Threat("PUP.Optional.Bundle", "low", "3 часа назад", "removed"),
        ]
        self.quarantine: List[QuarantinedItem] = [
            QuarantinedItem(
                "suspicious_installer.exe",
                "Malware.Generic.2024",
                "/Users/admin/Downloads/",
                "2 мин назад",
                "2.4 МБ",
                "high",
            ),
            QuarantinedItem(
                "adware_bundle.dmg",
                "Adware.Installer",
                "/Users/admin/Desktop/",
                "1 час назад",
                "15.8 МБ",
                "medium",
            ),
            QuarantinedItem(
                "tracking_cookie.js",
                "PUP.Optional.Bundle",
                "/Users/admin/Library/Caches/",
                "3 часа назад",
                "124 КБ",
                "low",
            ),
        ]
        self.scan_history: List[ScanHistoryEntry] = [
            ScanHistoryEntry("быстрое", 12_450, 0, 150),
            ScanHistoryEntry("полное", 284_592, 2, 2_300),
            ScanHistoryEntry("быстрое", 11_230, 0, 140),
        ]

    def run(self) -> None:
        actions = {
            "1": self.show_dashboard,
            "2": self.run_scan,
            "3": self.show_quarantine,
            "4": self.show_settings,
            "q": self.quit,
        }

        while True:
            print("\n=== SSN Antivirus (CLI) ===")
            print("1. Панель безопасности")
            print("2. Сканер угроз")
            print("3. Карантин")
            print("4. Настройки")
            print("q. Выход")
            choice = input("Выберите раздел: ").strip().lower()

            action = actions.get(choice)
            if action:
                action()
            else:
                print("Неизвестная команда. Попробуйте снова.")

    def show_dashboard(self) -> None:
        print("\n--- Панель безопасности ---")
        status_lines = [
            "Защита в реальном времени: АКТИВНО",  # mirrors the React badge
            "Проверено файлов всего: 1 284 592",
            "Состояние системы: Отлично",
        ]
        for line in status_lines:
            print(f"• {line}")

        print("\nПоследние угрозы:")
        for threat in self.recent_threats:
            severity = {
                "high": "Высокий риск",
                "medium": "Средний риск",
                "low": "Низкий риск",
            }.get(threat.severity, "Неизвестно")
            print(f" - {threat.name} ({severity}), {threat.time_seen}, статус: {threat.status}")

        print("\nПроизводительность системы:")
        self._render_meter("ЦП", 12)
        self._render_meter("Память", 28)
        self._render_meter("Диск", 8)

    def run_scan(self) -> None:
        print("\n--- Сканер угроз ---")
        scan_types = {
            "1": ("быстрое", 90, 150, 300),
            "2": ("полное", 2_000, 400, 3_600),
            "3": ("выборочное", 600, 200, 1_800),
        }
        for key, (name, *_rest) in scan_types.items():
            print(f"{key}. {name.title()} сканирование")

        choice = input("Выберите тип сканирования: ").strip()
        scan_info = scan_types.get(choice)
        if not scan_info:
            print("Неверный выбор.")
            return

        scan_name, base_files, jitter, est_duration = scan_info
        self._simulate_scan(scan_name, base_files, jitter, est_duration)

    def show_quarantine(self) -> None:
        print("\n--- Карантин ---")
        if not self.quarantine:
            print("Карантин пуст. Все системы защищены.")
            return

        for idx, item in enumerate(self.quarantine, start=1):
            print(
                textwrap.dedent(
                    f"""
                    {idx}. {item.name} | Риск: {item.risk}
                       Угроза: {item.threat}
                       Расположение: {item.path}
                       Размер: {item.size} | Время: {item.date}
                    """
                ).strip()
            )

        action = input("Введите номер для удаления (d), восстановления (r) или Enter для выхода: ").strip().lower()
        if not action:
            return

        if len(action) < 2 or not action[1:].isdigit():
            print("Неверный ввод.")
            return

        command, index_str = action[0], action[1:]
        index = int(index_str) - 1
        if not (0 <= index < len(self.quarantine)):
            print("Нет такого объекта.")
            return

        item = self.quarantine.pop(index)
        if command == "d":
            print(f"Удалено: {item.name}")
        elif command == "r":
            print(f"Восстановлено: {item.name}")
        else:
            print("Неизвестная операция.")

    def show_settings(self) -> None:
        print("\n--- Настройки ---")
        for key, value in self.settings.toggles().items():
            label = {
                "realtime_protection": "Защита в реальном времени",
                "cloud_signatures": "Облачные сигнатуры",
                "scheduled_scan": "Запланированное сканирование",
            }[key]
            state = "ВКЛ" if value else "ВЫКЛ"
            print(f" - {label}: {state}")

        print("\nВведите имя настройки для переключения (например, realtime) или Enter для выхода.")
        print("Доступные ключи: realtime, cloud, schedule")
        choice = input("> ").strip().lower()
        if not choice:
            return

        mapping = {
            "realtime": "realtime_protection",
            "cloud": "cloud_signatures",
            "schedule": "scheduled_scan",
        }
        attr = mapping.get(choice)
        if not attr:
            print("Неизвестный ключ.")
            return

        current = getattr(self.settings, attr)
        setattr(self.settings, attr, not current)
        if attr == "scheduled_scan" and self.settings.scheduled_scan:
            new_time = input(f"Время сканирования (текущее {self.settings.scheduled_scan_time}): ").strip()
            if new_time:
                self.settings.scheduled_scan_time = new_time
        print("Настройка обновлена.")

    def quit(self) -> None:
        print("Выход... Берегите систему в безопасности!")
        sys.exit(0)

    def _render_meter(self, label: str, percent: int) -> None:
        bar_length = 20
        filled = int(bar_length * percent / 100)
        bar = "#" * filled + "-" * (bar_length - filled)
        print(f" {label:<8}: [{bar}] {percent}%")

    def _simulate_scan(self, scan_name: str, base_files: int, jitter: int, est_duration: int) -> None:
        start = time.perf_counter()
        print(f"Начато {scan_name} сканирование...")
        total_files = 0
        threats_found = 0
        for percent in range(0, 101, 2):
            chunk = random.randint(jitter // 4, jitter)
            total_files += base_files + chunk
            if random.random() < 0.05:
                threats_found += 1
            bar = "#" * (percent // 2) + "-" * (50 - percent // 2)
            print(f"[{bar}] {percent:3d}% | Файлов проверено: {total_files:,} | Найдено угроз: {threats_found}", end="\r")
            time.sleep(est_duration / 2000)
        print()  # newline after carriage return loop

        elapsed = time.perf_counter() - start
        self.scan_history.insert(0, ScanHistoryEntry(scan_name, total_files, threats_found, elapsed))
        print("Сканирование завершено!")
        print(f"Файлов проверено: {total_files:,}")
        print(f"Найдено угроз: {threats_found}")
        print(f"Время: {elapsed:.1f} сек")

        print("\nПоследние проверки:")
        for entry in self.scan_history[:5]:
            print(" - " + entry.summary())


def main() -> None:
    AntivirusCLI().run()


if __name__ == "__main__":
    main()
