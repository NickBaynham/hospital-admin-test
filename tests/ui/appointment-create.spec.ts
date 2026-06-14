import { test, expect } from '@playwright/test';
import { reset } from '../api/_helpers';

/**
 * Create Appointment UI happy path: the department -> doctor dependency, form fill,
 * submit, and the new row appearing in the appointments list.
 * Sequential, single global DB — run via `npm run test:ui`.
 */
test.describe('Create Appointment page', () => {
  test.beforeEach(async ({ request }) => {
    await reset(request);
  });

  test.afterAll(async ({ request }) => {
    await reset(request);
  });

  test('the doctor dropdown is filtered by the selected department', async ({ page }) => {
    await page.goto('/appointments/new');
    const doctor = page.getByTestId('appointment-doctor-select');

    // Disabled until a department is chosen.
    await expect(doctor).toBeDisabled();

    await page.getByTestId('appointment-department-select').selectOption({ label: 'Cardiology' });
    await expect(doctor).toBeEnabled();
    await expect(doctor.locator('option')).toContainText(['Select...', 'Dr. Sarah Chen']);

    // Changing the department refreshes the doctor list.
    await page.getByTestId('appointment-department-select').selectOption({ label: 'Pediatrics' });
    await expect(doctor.locator('option')).toContainText(['Select...', 'Dr. James Patel']);
  });

  test('creates an appointment and shows it in the list', async ({ page }) => {
    await page.goto('/appointments/new');

    await page.getByTestId('appointment-department-select').selectOption({ label: 'Pediatrics' });
    await page.getByTestId('appointment-doctor-select').selectOption({ label: 'Dr. James Patel' });
    await page.getByTestId('appointment-patient-select').selectOption({ label: 'John Smith' });
    await page.getByTestId('appointment-date-input').fill('2030-08-15');
    await page.getByTestId('appointment-time-input').fill('09:00');
    await page.getByTestId('appointment-type-select').selectOption({ label: 'consultation' });
    await page.getByTestId('appointment-priority-routine').check();
    await page.getByTestId('appointment-symptoms-textarea').fill('Routine pediatric checkup');

    await page.getByTestId('create-appointment-submit').click();

    // Redirects to the appointments list, where the new row is visible.
    await expect(page).toHaveURL(/\/appointments$/);
    const table = page.getByTestId('appointments-table');
    const newRow = table.locator('tbody tr', { hasText: 'Dr. James Patel' });
    await expect(newRow).toContainText('John Smith');
    await expect(newRow).toContainText('2030-08-15');
    await expect(newRow).toContainText('scheduled');
  });
});
