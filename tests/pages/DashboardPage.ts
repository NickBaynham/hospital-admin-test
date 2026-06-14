import { type Page, type Locator } from '@playwright/test';

/** Page object for the Dashboard (/). */
export class DashboardPage {
  constructor(private readonly page: Page) {}

  readonly root = () => this.page.getByTestId('dashboard-page');
  readonly upcomingTable = () => this.page.getByTestId('upcoming-appointments');

  /** A summary count card, e.g. count('patients'), count('scheduled'). */
  count(name: 'patients' | 'doctors' | 'appointments' | 'scheduled'): Locator {
    return this.page.getByTestId(`count-${name}`);
  }

  upcomingRows(): Locator {
    return this.upcomingTable().locator('tbody tr');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
