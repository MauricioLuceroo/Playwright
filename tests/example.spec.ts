import { test, expect } from './fixtures/test.fixture';

test.describe('Página de inicio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe mostrar el título correcto', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('debe navegar a la documentación al hacer clic en Get started', async ({
    homePage,
    page,
  }) => {
    await homePage.clickGetStarted();
    await expect(page).toHaveURL(/.*docs/);
  });
  test('debe mostrar el enlace Get started', async ({ homePage }) => {
    await expect(homePage.getStartedLink).toBeVisible();
  });
});
