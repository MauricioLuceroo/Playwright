import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly getStartedLink: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.heading = page.getByRole('heading', { level: 1 });
  }

  async clickGetStarted(): Promise<void> {
    await this.getStartedLink.click();
  }
}
