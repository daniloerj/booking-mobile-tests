# Booking.com Mobile Automation

Automatización E2E de la app móvil de Booking.com usando WebdriverIO, Appium, Allure y GitHub Actions.

---

## Requisitos

- Node.js >= 16
- Java JDK 8/11 (JAVA_HOME configurado)
- Android SDK (ANDROID_HOME configurado)
- Appium (`npm install -g appium`)
- Allure CLI (`npm install -g allure-commandline`)
- Emulador Android o dispositivo físico

---

## Instalación

```bash
git clone https://github.com/daniloerj/booking-mobile-tests.git
cd booking-mobile-tests
npm install
```

---

## Estructura del proyecto

```
booking-mobile-tests/
├── test/
│   ├── specs/
│   │   └── booking.e2e.ts
│   ├── pageobjects/
│   │   ├── SearchPage.ts
│   │   ├── ResultsPage.ts
│   │   ├── RoomPage.ts
│   │   └── GuestPage.ts
│   └── helpers/
│       └── firstRunHelper.ts
├── wdio.conf.ts
├── package.json
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
└── README.md
```

---

## Ejecución de pruebas local

1. Inicia tu emulador o conecta tu dispositivo.
2. Asegúrate de tener el APK en la ruta configurada en `wdio.conf.ts`.
3. Ejecuta las pruebas:

```bash
npm test
```

---

## Reportes Allure

1. Genera el reporte:

   ```bash
   npm run allure:generate
   ```

2. Abre el reporte en tu navegador:

   ```bash
   npm run allure:open
   ```

---

## Integración continua (CI) con GitHub Actions

El proyecto incluye un workflow de GitHub Actions que:

- Instala dependencias y herramientas necesarias.
- Descarga el APK de la app.
- Levanta un emulador Android.
- Instala y ejecuta Appium.
- Corre las pruebas E2E.
- Genera y sube el reporte Allure como artefacto.

Puedes ver el archivo de configuración en `.github/workflows/ci.yml`.

---

## Scripts útiles

- `npm test` — Ejecuta las pruebas E2E.
- `npm run allure:generate` — Genera el reporte Allure.
- `npm run allure:open` — Abre el reporte Allure.

---

## Notas

- Los selectores pueden requerir ajustes según la versión de la app.
- Usa Appium Inspector para identificar elementos y actualizar los Page Objects.
- El helper `firstRunHelper.ts` gestiona popups iniciales de la app.
- El APK se descarga automáticamente en CI, pero debe estar presente localmente para pruebas manuales.

---

## Contribuciones

Pull requests y sugerencias son bienvenidas.

---

**Autor:** Danilo Efrain Ramirez Jara
**Repositorio:** [https://github.com/daniloerj/booking-mobile-tests](https://github.com/daniloerj/booking-mobile-tests)