import { test, expect } from '../fixtures';
import { DashboardPage } from '../pages/DashboardPage';

/**
 * Dashboard UI coverage (happy path). Uses the DashboardPage object; auto-reset +
 * seed data come from fixtures.
 */
test.describe('Dashboard page', () => {
  test('REQ-037 shows the seeded summary counts', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await expect(dashboard.root()).toBeVisible();

    // Seed baseline: 3 patients, 4 doctors, 3 appointments (2 scheduled, 1 completed).
    await expect(dashboard.count('patients')).toHaveText('3');
    await expect(dashboard.count('doctors')).toHaveText('4');
    await expect(dashboard.count('appointments')).toHaveText('3');
    await expect(dashboard.count('scheduled')).toHaveText('2');
  });

  test('REQ-038 lists upcoming appointments', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await expect(dashboard.upcomingRows()).toHaveCount(2);
    await expect(dashboard.upcomingTable()).toContainText('John Smith');
    await expect(dashboard.upcomingTable()).toContainText('Maria Garcia');
  });

  test('REQ-040 REQ-041 reflects a cancellation: count drops and row leaves upcoming', async ({
    page,
    request,
    seeded,
    db,
  }) => {
    const target = seeded.appointments.find((a) => a.status === 'scheduled')!;
    const patch = await request.patch(`${seeded.api}/appointments/${target.id}/status`, {
      data: { status: 'cancelled' },
    });
    expect(patch.ok()).toBeTruthy();

    // DB assertion: the status change is actually persisted in MongoDB.
    const stored = await db.findById('appointments', target.id);
    expect(stored?.status, 'cancellation must persist in the database').toBe('cancelled');

    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await expect(dashboard.count('scheduled')).toHaveText('1');
    await expect(dashboard.upcomingRows()).toHaveCount(1);
  });
});
