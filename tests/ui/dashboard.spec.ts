import { test, expect } from '@playwright/test';
import { reset } from '../api/_helpers';

/**
 * Dashboard UI coverage (happy path). Asserts the seeded summary counts and the
 * upcoming-appointments table. Sequential, single global DB — run via `npm run test:ui`.
 */
test.describe('Dashboard page', () => {
  test.beforeEach(async ({ request }) => {
    await reset(request);
  });

  test.afterAll(async ({ request }) => {
    await reset(request);
  });

  test('shows the seeded summary counts', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('dashboard-page')).toBeVisible();

    // Seed baseline: 3 patients, 4 doctors, 3 appointments (2 scheduled, 1 completed).
    await expect(page.getByTestId('count-patients')).toHaveText('3');
    await expect(page.getByTestId('count-doctors')).toHaveText('4');
    await expect(page.getByTestId('count-appointments')).toHaveText('3');
    await expect(page.getByTestId('count-scheduled')).toHaveText('2');
  });

  test('lists upcoming appointments', async ({ page }) => {
    await page.goto('/');
    const rows = page.getByTestId('upcoming-appointments').locator('tbody tr');
    await expect(rows).toHaveCount(2);
    await expect(page.getByTestId('upcoming-appointments')).toContainText('John Smith');
    await expect(page.getByTestId('upcoming-appointments')).toContainText('Maria Garcia');
  });

  test('reflects a cancellation: count drops and row leaves upcoming', async ({ page, request }) => {
    // Cancel the first scheduled appointment via the API, then assert the dashboard updates.
    const appts = await (await request.get('http://localhost:8000/appointments?status=scheduled')).json();
    const target = appts[0];
    const patch = await request.patch(
      `http://localhost:8000/appointments/${target.id}/status`,
      { data: { status: 'cancelled' } },
    );
    expect(patch.ok()).toBeTruthy();

    await page.goto('/');
    await expect(page.getByTestId('count-scheduled')).toHaveText('1');
    const rows = page.getByTestId('upcoming-appointments').locator('tbody tr');
    await expect(rows).toHaveCount(1);
  });
});
