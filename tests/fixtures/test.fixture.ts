import { test as base } from '@playwright/test';
import { HomePage } from '../../src/pages/home.page';

type TestFixtures = {
  homePage: HomePage;
};

/**
 * Fixtures personalizados que extienden el test base de Playwright.
 * Inyecta Page Objects listos para usar en cada test.
 */
export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from '@playwright/test';
