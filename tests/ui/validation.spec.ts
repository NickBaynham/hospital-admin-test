import { test, expect } from '../fixtures';

/**
 * UI validation coverage: how the forms surface validation. Server errors appear in
 * the `error-message` element; the appointment form adds a "symptoms >= 10 chars" check.
 * Duplicate-email cases read the existing email from the seed fixture (data-driven).
 */
test.describe('Form validation (UI)', () => {
  test('REQ-019 patient form surfaces a server error for a duplicate email', async ({
    page,
    seeded,
  }) => {
    const existingEmail = seeded.patients[0].email;
    await page.goto('/patients');

    await page.getByTestId('patient-name-input').fill('Dup Patient');
    await page.getByTestId('patient-email-input').fill(existingEmail);
    await page.getByTestId('patient-phone-input').fill('555-111-2222');
    await page.getByTestId('patient-dob-input').fill('1990-01-01');
    await page.getByTestId('patient-gender-female').check();
    await page.getByTestId('insurance-provider-select').selectOption({ label: 'Blue Shield' });
    await page.getByTestId('create-patient-submit').click();

    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).not.toBeEmpty();
    expect(seeded.patients.length, 'baseline patient count').toBe(3);
  });

  test('REQ-013 doctor form surfaces a server error for a duplicate email', async ({
    page,
    seeded,
  }) => {
    const existingEmail = seeded.doctors[0].email;
    await page.goto('/doctors');

    await page.getByTestId('doctor-name-input').fill('Dr. Dup');
    await page.getByTestId('doctor-email-input').fill(existingEmail);
    await page.getByTestId('doctor-department-select').selectOption({ label: 'Cardiology' });
    await page.getByTestId('doctor-specialty-input').fill('Cardiology');
    await page.getByTestId('doctor-availability-Monday').check();
    await page.getByTestId('create-doctor-submit').click();

    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).not.toBeEmpty();
  });

  test('REQ-049 appointment form shows a client-side error for too-short symptoms', async ({
    page,
    request,
    seeded,
  }) => {
    const before = seeded.appointments.length;
    await page.goto('/appointments/new');

    await page.getByTestId('appointment-department-select').selectOption({ label: 'Cardiology' });
    await page.getByTestId('appointment-doctor-select').selectOption({ label: 'Dr. Sarah Chen' });
    await page.getByTestId('appointment-patient-select').selectOption({ label: 'John Smith' });
    await page.getByTestId('appointment-date-input').fill('2030-05-20');
    await page.getByTestId('appointment-time-input').fill('11:00');
    await page.getByTestId('appointment-type-select').selectOption({ label: 'consultation' });
    await page.getByTestId('appointment-priority-routine').check();
    await page.getByTestId('appointment-symptoms-textarea').fill('short'); // < 10 chars

    await page.getByTestId('create-appointment-submit').click();

    await expect(page.getByTestId('error-message')).toHaveText('Symptoms must be at least 10 characters');
    await expect(page).toHaveURL(/\/appointments\/new$/);
    const after = await request.get(`${seeded.api}/appointments`);
    expect((await after.json()).length, 'no appointment created').toBe(before);
  });

  // BUG-04 follow-up: an incomplete form (a required field left unset) does not submit.
  // The form relies on native HTML5 `required` validation (no in-app error-message).
  test('REQ-049 appointment form blocks submission when a required field is unset', async ({
    page,
    request,
    seeded,
  }) => {
    const before = seeded.appointments.length;
    await page.goto('/appointments/new');

    // Fill everything valid EXCEPT priority.
    await page.getByTestId('appointment-department-select').selectOption({ label: 'Cardiology' });
    await page.getByTestId('appointment-doctor-select').selectOption({ label: 'Dr. Sarah Chen' });
    await page.getByTestId('appointment-patient-select').selectOption({ label: 'John Smith' });
    await page.getByTestId('appointment-date-input').fill('2030-05-20');
    await page.getByTestId('appointment-time-input').fill('11:00');
    await page.getByTestId('appointment-type-select').selectOption({ label: 'consultation' });
    await page.getByTestId('appointment-symptoms-textarea').fill('Valid length symptoms');

    await page.getByTestId('create-appointment-submit').click();

    await expect(page, 'native required validation should keep us on the form').toHaveURL(
      /\/appointments\/new$/,
    );
    const after = await request.get(`${seeded.api}/appointments`);
    expect((await after.json()).length, 'no appointment created').toBe(before);
  });
});
