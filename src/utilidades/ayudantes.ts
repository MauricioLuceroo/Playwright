import { Page } from '@playwright/test';


/**
 * Espera un tiempo fijo (usar solo cuando no hay alternativa con auto-wait).
 */
export async function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => globalThis.setTimeout(resolve, ms));
}

/**
 * Genera un identificador único para datos de prueba.
 */
export function generarIdUnico(prefix = 'prueba'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Toma una captura de pantalla con nombre descriptivo.
 */
export async function tomarCapturaPagina(page: Page, nombre: string): Promise<void> {
  await page.screenshot({
    path: `resultados-pruebas/screenshots/${nombre}-${Date.now()}.png`,
    fullPage: true,
  });
}
