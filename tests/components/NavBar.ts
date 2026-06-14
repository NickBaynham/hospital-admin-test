import { type Page, type Locator } from '@playwright/test';

/** Component object for the shared navigation bar (data-testid="main-nav"). */
export class NavBar {
  readonly root: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByTestId('main-nav');
  }

  link(name: string): Locator {
    return this.root.getByRole('link', { name });
  }

  async goTo(name: string): Promise<void> {
    await this.link(name).click();
  }
}
