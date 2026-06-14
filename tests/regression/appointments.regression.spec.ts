import { test, expect } from '../fixtures';
import { API, getJson } from '../api/_helpers';

/**
 * Regression tests for known appointment-scheduling defects (CH-001 exploration).
 * Each test asserts the CORRECT behavior, so it currently FAILS (red) until the
 * defect is fixed. Auto-reset via fixtures. Run with `npm run test:regression`.
 */
test.describe('Appointment scheduling regressions (known defects)', () => {
  // BUG-01 / REQ-028: an appointment date in the past must be rejected.
  test('BUG-01 REQ-028: a past appointment date is rejected', async ({ request }) => {
    const [patients, doctors] = await Promise.all([
      getJson(request, '/patients'),
      getJson(request, '/doctors'),
    ]);
    const doctor = doctors[0];
    const res = await request.post(`${API}/appointments`, {
      data: {
        patient_id: patients[0].id,
        doctor_id: doctor.id,
        department_id: doctor.department_id,
        appointment_date: '2020-01-01',
        appointment_time: '09:00',
        appointment_type: 'consultation',
        priority: 'routine',
        symptoms: 'past-date regression',
      },
    });
    expect(
      res.status(),
      'a past-dated appointment should be rejected (>= 400), not created',
    ).toBeGreaterThanOrEqual(400);
  });

  // BUG-02 / REQ-029: an inactive doctor must not be bookable.
  test('BUG-02 REQ-014 REQ-029: an inactive doctor cannot be booked', async ({ request }) => {
    const [patients, doctors] = await Promise.all([
      getJson(request, '/patients'),
      getJson(request, '/doctors'),
    ]);
    const doctor = doctors[0];

    const deactivate = await request.put(`${API}/doctors/${doctor.id}`, {
      data: {
        name: doctor.name,
        email: doctor.email,
        specialty: doctor.specialty,
        department_id: doctor.department_id,
        availability: doctor.availability,
        active: false,
      },
    });
    expect(deactivate.ok(), 'deactivating the doctor should succeed').toBeTruthy();

    const res = await request.post(`${API}/appointments`, {
      data: {
        patient_id: patients[0].id,
        doctor_id: doctor.id,
        department_id: doctor.department_id,
        appointment_date: '2030-01-01',
        appointment_time: '09:00',
        appointment_type: 'consultation',
        priority: 'routine',
        symptoms: 'inactive-doctor regression',
      },
    });
    expect(
      res.status(),
      'an inactive doctor should not be bookable (>= 400)',
    ).toBeGreaterThanOrEqual(400);
  });

  // BUG-03 / REQ-036: the same doctor must not be double-booked at the same date and time.
  test('BUG-03 REQ-036: the same doctor cannot be double-booked at the same slot', async ({ request }) => {
    const [appointments, patients] = await Promise.all([
      getJson(request, '/appointments'),
      getJson(request, '/patients'),
    ]);
    expect(appointments.length, 'seed has at least one appointment').toBeGreaterThan(0);
    const slot = appointments[0];
    // A different patient, so this isolates double-booking the DOCTOR, not the patient.
    const otherPatient = patients.find((p: any) => p.id !== slot.patient_id) ?? patients[0];

    const res = await request.post(`${API}/appointments`, {
      data: {
        patient_id: otherPatient.id,
        doctor_id: slot.doctor_id,
        department_id: slot.department_id,
        appointment_date: slot.appointment_date,
        appointment_time: slot.appointment_time,
        appointment_type: 'consultation',
        priority: 'routine',
        symptoms: 'double-booking regression',
      },
    });
    expect(
      res.status(),
      'double-booking the same doctor/date/time should be rejected (>= 400)',
    ).toBeGreaterThanOrEqual(400);
  });
});
