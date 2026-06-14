import { test, expect } from '../fixtures';
import { AppointmentsPage } from '../pages/AppointmentsPage';

/**
 * Appointments list UI: table rendering, the status/department filters, the row
 * action buttons (Mark Completed / Cancel / Delete), and the empty state. These
 * exercise the UI wiring the API tests can't — that the buttons and filters
 * actually drive the app. Auto-reset + seed data via fixtures.
 */
test.describe('Appointments list page', () => {
  test('REQ-035 lists the seeded appointments', async ({ page, seeded }) => {
    const appts = new AppointmentsPage(page);
    await appts.goto();
    await expect(appts.rows()).toHaveCount(seeded.appointments.length);
  });

  test('REQ-035 filters the list by status', async ({ page, seeded }) => {
    const appts = new AppointmentsPage(page);
    await appts.goto();
    await appts.filterByStatus('scheduled');
    const scheduled = seeded.appointments.filter((a) => a.status === 'scheduled').length;
    await expect(appts.rows()).toHaveCount(scheduled);
    for (const row of await appts.rows().all()) {
      await expect(row).toContainText('scheduled');
    }
  });

  test('REQ-035 filters the list by department', async ({ page }) => {
    const appts = new AppointmentsPage(page);
    await appts.goto();
    await appts.filterByDepartment('Cardiology');
    for (const row of await appts.rows().all()) {
      await expect(row).toContainText('Cardiology');
    }
  });

  test('REQ-033 marks a scheduled appointment completed from the list', async ({
    page,
    seeded,
    db,
  }) => {
    const target = seeded.appointments.find((a) => a.status === 'scheduled')!;
    const appts = new AppointmentsPage(page);
    await appts.goto();
    await appts.markCompleted(target.id);

    await expect(appts.row(target.id)).toContainText('completed');
    const stored = await db.findById('appointments', target.id);
    expect(stored!.status, 'completion persisted').toBe('completed');
  });

  test('REQ-034 cancels a scheduled appointment from the list', async ({ page, seeded, db }) => {
    const target = seeded.appointments.find((a) => a.status === 'scheduled')!;
    const appts = new AppointmentsPage(page);
    await appts.goto();
    await appts.cancel(target.id);

    await expect(appts.row(target.id)).toContainText('cancelled');
    const stored = await db.findById('appointments', target.id);
    expect(stored!.status, 'cancellation persisted').toBe('cancelled');
  });

  test('REQ-045 deletes an appointment from the list', async ({ page, seeded, db }) => {
    const target = seeded.appointments[0];
    const appts = new AppointmentsPage(page);
    await appts.goto();
    await appts.delete(target.id);

    await expect(appts.row(target.id)).toHaveCount(0);
    expect(await db.findById('appointments', target.id), 'deleted from store').toBeNull();
    expect(await db.count('appointments')).toBe(seeded.appointments.length - 1);
  });

  test('REQ-042 shows an empty list when there are no appointments', async ({
    page,
    request,
    seeded,
  }) => {
    for (const appt of seeded.appointments) {
      await request.delete(`${seeded.api}/appointments/${appt.id}`);
    }
    const appts = new AppointmentsPage(page);
    await appts.goto();
    await expect(appts.rows()).toHaveCount(0);
  });
});
