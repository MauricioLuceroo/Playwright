# Playwright + TypeScript — Automatización de API

Este proyecto está preparado para automatizar pruebas de API con Playwright y TypeScript, usando la API de Restful Booker como ejemplo.

## ¿Qué hace este proyecto?

Permite ejecutar pruebas HTTP de forma organizada, reutilizando:
- clientes de API
- datos de prueba
- variables de entorno
- fixtures de Playwright

## Estructura del proyecto

```text
Playwright-TypeScript/
├── src/
│   ├── api/                         # Clientes y clases para consumir APIs
│   │   └── restful-booker.api.ts   # Ejemplo de cliente para Restful Booker
│   ├── config/                     # Configuración del entorno
│   │   └── env.config.ts           # Lee .env y expone variables tipadas
│   ├── data/                       # Datos de prueba reutilizables
│   │   └── booking-data.ts         # Payloads, datos de reserva, etc.
│   └── utils/                      # Helpers reutilizables
│       └── helpers.ts              # Funciones auxiliares como wait, screenshots, IDs
├── tests/
│   ├── api/                        # Tests de API
│   │   └── restful-booker.api.spec.ts
│   └── fixtures/                   # Fixtures personalizados de Playwright
│       └── test.fixture.ts         # Inyecta el cliente API en los tests
├── .env.example                    # Plantilla de variables de entorno
├── package.json                     # Scripts y dependencias
├── playwright.config.ts             # Configuración general de Playwright
├── tsconfig.json                    # Configuración de TypeScript
└── README.md                        # Esta guía
```

## ¿Qué va en cada carpeta?

### src/api
Aquí van las clases que consumen endpoints HTTP.

Ejemplo:
- crear métodos como `healthCheck()`, `login()` o `createBooking()`
- encapsular la lógica de la API para que los tests queden limpios

### src/config
Aquí van los valores de entorno y la configuración que usa el proyecto.

Ejemplo:
- `BASE_URL`
- `RESTFUL_BOOKER_BASE_URL`
- `TEST_USER`
- `TEST_PASSWORD`

### src/data
Aquí van los datos que se reutilizan en los tests.

Ejemplo:
- payloads de reserva
- usuarios de prueba
- fechas
- datos estáticos

### src/utils
Aquí van funciones auxiliares que no son tests pero sí ayudan en el flujo.

Ejemplo:
- generar IDs únicos
- esperar tiempos cortos
- capturas de pantalla

### tests/api
Aquí van los tests que llaman endpoints HTTP.

Ejemplo:
- validar que un endpoint responde 200 o 201
- crear reservas
- autenticar usuarios

### tests/fixtures
Aquí van los fixtures personalizados que inyectan objetos reutilizables en los tests.

Ejemplo:
- un fixture `restfulBookerApi` para usar directamente en los tests

## Flujo de una prueba de API

1. El test vive en `tests/api/`.
2. El fixture inyecta el cliente API desde `src/api/`.
3. El cliente usa los datos de `src/data/` y las variables de `src/config/`.
4. Playwright ejecuta la prueba y valida la respuesta HTTP.

## Configuración inicial

1. Copia `.env.example` a `.env`
2. Ajusta las variables según el entorno que quieras usar
3. Instala dependencias con `npm install`
4. Ejecuta los tests con:
   - `npm run test:api`

## Scripts útiles

| Comando | Descripción |
|---------|-------------|
| `npm test` | Ejecuta todas las pruebas |
| `npm run test:api` | Ejecuta solo las pruebas de API |
| `npm run test:headed` | Ejecuta las pruebas con navegador visible |
| `npm run typecheck` | Verifica que el código TypeScript no tenga errores |

## Notas

Este proyecto está pensado para empezar con API testing de forma simple y escalable. Si más adelante quieres agregar UI, puedes incorporar una carpeta nueva para eso sin romper la estructura actual.
