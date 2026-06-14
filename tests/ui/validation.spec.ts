import { test, expect } from '../fixtures';
import { CreateAppointmentPage } from '../pages/CreateAppointmentPage';
import { PatientsPage } from '../pages/PatientsPage';
import { DoctorsPage } from '../pages/DoctorsPage';

/**
 * UI validation coverage via page objects. Server errors appear in the page's
 * error message; the appointment form adds a "symptoms >= 10 chars" check.
 */
test.describe('Form validation (UI)', () => {
  test('REQ-019 patient form surfaces a server error for a duplicate email', async ({
    page,
    seeded,
    db,
  }) => {
    const patients = new PatientsPage(page);
    await patients.goto();
    await patients.fill({
      name: 'Dup Patient',
      email: seeded.patients[0].email, // existing seed email
      phone: '555-111-2222',
      dob: '1990-01-01',
      gender: 'female',
      insurance: 'Blue Shield',
    });
    await patients.submit();

    await expect(patients.errorMessage()).toBeVisible();
    await expect(patients.errorMessage()).not.toBeEmpty();
    // DB assertion: the rejected patient was not written.
    expect(await db.count('patients'), 'no patient added on duplicate email').toBe(3);
  });

  test('REQ-013 doctor form surfaces a server error for a duplicate email', async ({
    page,
    seeded,
    db,
  }) => {
    const doctors = new DoctorsPage(page);
    await doctors.goto();
    await doctors.fill({
      name: 'Dr. Dup',
      email: seeded.doctors[0].email, // existing seed email
      department: 'Cardiology',
      specialty: 'Cardiology',
      availability: ['Monday'],
    });
    await doctors.submit();

    await expect(doctors.errorMessage()).toBeVisible();
    await expect(doctors.errorMessage()).not.toBeEmpty();
    expect(await db.count('doctors'), 'no doctor added on duplicate email').toBe(4);
  });

  test('REQ-049 appointment form shows a client-side error for too-short symptoms', async ({
    page,
    db,
  }) => {
    const form = new CreateAppointmentPage(page);
    await form.goto();
    await form.fill({
      department: 'Cardiology',
      doctor: 'Dr. Sarah Chen',
      patient: 'John Smith',
      date: '2030-05-20',
      time: '11:00',
      type: 'consultation',
      priority: 'routine',
      symptoms: 'short', // < 10 chars
    });
    await form.submit();

    await expect(form.errorMessage()).toHaveText('Symptoms must be at least 10 characters');
    await expect(page).toHaveURL(/\/appointments\/new$/);
    expect(await db.count('appointments'), 'no appointment created').toBe(3);
  });

  // BUG-04 follow-up: native HTML5 `required` blocks an incomplete submit (no in-app message).
  test('REQ-049 appointment form blocks submission when a required field is unset', async ({
    page,
    db,
  }) => {
    const form = new CreateAppointmentPage(page);
    await form.goto();
    // Fill everything valid EXCEPT priority (omit it).
    await form.fill({
      department: 'Cardiology',
      doctor: 'Dr. Sarah Chen',
      patient: 'John Smith',
      date: '2030-05-20',
      time: '11:00',
      type: 'consultation',
      symptoms: 'Valid length symptoms',
    });
    await form.submit();

    await expect(page, 'native required validation should keep us on the form').toHaveURL(
      /\/appointments\/new$/,
    );
    expect(await db.count('appointments'), 'no appointment created').toBe(3);
  });
});
