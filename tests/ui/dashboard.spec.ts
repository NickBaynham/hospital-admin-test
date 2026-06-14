import { test, expect } from '../fixtures';

/**
 * Dashboard UI coverage (happy path). Auto-reset + seed data come from fixtures.
 * Run via `npm run test:ui`.
 */
test.describe('Dashboard page', () => {
  test('REQ-037 shows the seeded summary counts', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('dashboard-page')).toBeVisible();

    // Seed baseline: 3 patients, 4 doctors, 3 appointments (2 scheduled, 1 completed).
    await expect(page.getByTestId('count-patients')).toHaveText('3');
    await expect(page.getByTestId('count-doctors')).toHaveText('4');
    await expect(page.getByTestId('count-appointments')).toHaveText('3');
    await expect(page.getByTestId('count-scheduled')).toHaveText('2');
  });

  test('REQ-038 lists upcoming appointments', async ({ page }) => {
    await page.goto('/');
    const rows = page.getByTestId('upcoming-appointments').locator('tbody tr');
    await expect(rows).toHaveCount(2);
    await expect(page.getByTestId('upcoming-appointments')).toContainText('John Smith');
    await expect(page.getByTestId('upcoming-appointments')).toContainText('Maria Garcia');
  });

  test('REQ-040 REQ-041 reflects a cancellation: count drops and row leaves upcoming', async ({
    page,
    request,
    seeded,
  }) => {
    // Cancel a scheduled appointment via the API, then assert the dashboard updates.
    const target = seeded.appointments.find((a) => a.status === 'scheduled')!;
    const patch = await request.patch(`${seeded.api}/appointments/${target.id}/status`, {
      data: { status: 'cancelled' },
    });
    expect(patch.ok()).toBeTruthy();

    await page.goto('/');
    await expect(page.getByTestId('count-scheduled')).toHaveText('1');
    const rows = page.getByTestId('upcoming-appointments').locator('tbody tr');
    await expect(rows).toHaveCount(1);
  });
});
