import { test, expect } from '../fixtures';
import { idEquals } from '../db';
import { CreateAppointmentPage } from '../pages/CreateAppointmentPage';

/**
 * Create Appointment UI happy path via the page object, with a database assertion
 * confirming the new appointment is stored with the correct relationship references.
 */
test.describe('Create Appointment page', () => {
  test('REQ-027 the doctor dropdown is filtered by the selected department', async ({ page }) => {
    const form = new CreateAppointmentPage(page);
    await form.goto();

    await expect(form.doctorSelect()).toBeDisabled();

    await form.selectDepartment('Cardiology');
    await expect(form.doctorSelect()).toBeEnabled();
    await expect(form.doctorOptions()).toContainText(['Select...', 'Dr. Sarah Chen']);

    await form.selectDepartment('Pediatrics');
    await expect(form.doctorOptions()).toContainText(['Select...', 'Dr. James Patel']);
  });

  test('REQ-025 creates an appointment, shows it in the list, and stores it correctly', async ({
    page,
    request,
    seeded,
    db,
  }) => {
    const form = new CreateAppointmentPage(page);
    await form.goto();
    await form.fill({
      department: 'Pediatrics',
      doctor: 'Dr. James Patel',
      patient: 'John Smith',
      date: '2030-08-15',
      time: '09:00',
      type: 'consultation',
      priority: 'routine',
      symptoms: 'Routine pediatric checkup',
    });
    await form.submit();

    // UI: redirects to the list with the new row.
    await expect(page).toHaveURL(/\/appointments$/);
    const newRow = page.getByTestId('appointments-table').locator('tbody tr', {
      hasText: 'Dr. James Patel',
    });
    await expect(newRow).toContainText('John Smith');
    await expect(newRow).toContainText('2030-08-15');

    // DB: the appointment is stored with relationship references to the right docs.
    const appts = await (await request.get(`${seeded.api}/appointments`)).json();
    const created = appts.find(
      (a: any) => a.appointment_date === '2030-08-15' && a.appointment_time === '09:00',
    );
    expect(created, 'created appointment returned by API').toBeTruthy();

    const stored = await db.findById('appointments', created.id);
    expect(stored, 'appointment exists in MongoDB').toBeTruthy();
    expect(stored!.appointment_date).toBe('2030-08-15');
    expect(stored!.status).toBe('scheduled');
    const patient = seeded.patients.find((p) => p.name === 'John Smith')!;
    const doctor = seeded.doctors.find((d) => d.name === 'Dr. James Patel')!;
    expect(idEquals(stored!.patient_id, patient.id), 'patient_id stored as ObjectId ref').toBeTruthy();
    expect(idEquals(stored!.doctor_id, doctor.id), 'doctor_id stored as ObjectId ref').toBeTruthy();
    expect(idEquals(stored!.department_id, doctor.department_id), 'department_id ref').toBeTruthy();
  });
});
