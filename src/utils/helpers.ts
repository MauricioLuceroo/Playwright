import { Page } from '@playwright/test';

/**
 * Espera un tiempo fijo (usar solo cuando no hay alternativa con auto-wait).
 */
export async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Genera un identificador único para datos de prueba.
 */
export function generateUniqueId(prefix = 'test'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Toma screenshot con nombre descriptivo.
 */
export async function takeScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({
    path: `test-results/screenshots/${name}-${Date.now()}.png`,
    fullPage: true,
  });
}
