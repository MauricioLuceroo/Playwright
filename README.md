# Pruebas automáticas — Mapa Interactivo INNOVA

Repositorio de pruebas automáticas para el proyecto **Mapa Interactivo INNOVA**.

## ¿Qué es esto?

Es un conjunto de pruebas que simulan el uso real de la aplicación: abren la web en un navegador, interactúan con pantallas, botones y contenido, y verifican que todo funcione como se espera.

En la práctica, reemplazan parte del trabajo manual de probar la app una y otra vez cada vez que hay cambios.

## ¿Para qué sirve?

- Detectar errores antes de que lleguen a producción
- Comprobar que las funcionalidades principales sigan funcionando tras cada cambio
- Tener un registro automático de qué pasó en cada ejecución (reportes, capturas en caso de fallo)

Las pruebas están pensadas para ejecutarse de forma automática en el pipeline de CI/CD de GitHub, sin intervención manual.

## ¿Qué tecnologías usa?

| Tecnología | Rol |
|------------|-----|
| **Playwright** | Controla el navegador y ejecuta las pruebas |
| **TypeScript** | Lenguaje en el que están escritas las pruebas |
| **GitHub Actions** | Ejecuta las pruebas automáticamente en cada push o pull request |

## Estructura del repositorio

```
src/
  config/     Variables y configuración del entorno
  data/       Datos usados en las pruebas
  pages/      Representación de cada pantalla de la app
  utils/      Funciones de apoyo

tests/        Casos de prueba
```

- **`src/pages/`** — Describe los elementos de cada pantalla (botones, textos, secciones del mapa, etc.).
- **`tests/`** — Define qué escenarios se prueban y qué resultados se esperan.

## Estado actual

Proyecto base configurado. Las pruebas del Mapa Interactivo se irán agregando a medida que la aplicación esté disponible.
