import { test, expect } from '@playwright/test';
import { API, reset, getJson, appointmentPayload } from './_helpers';

/**
 * Appointment scheduling happy paths, relationship rule, filters, and status
 * transitions (functional). These assert implemented behavior and should PASS.
 * Sequential, single global DB — run via `npm run test:api`.
 */
test.describe('Appointments API', () => {
  test.beforeEach(async ({ request }) => {
    await reset(request);
  });

  test.afterAll(async ({ request }) => {
    await reset(request);
  });

  test('REQ-025 creates a valid future appointment and reads it back', async ({ request }) => {
    const [patients, doctors] = await Promise.all([
      getJson(request, '/patients'),
      getJson(request, '/doctors'),
    ]);
    const doctor = doctors[0];
    const res = await request.post(`${API}/appointments`, {
      data: appointmentPayload(patients[0].id, doctor.id, doctor.department_id),
    });
    expect(res.status(), 'valid appointment should be created').toBe(201);
    const appt = await res.json();
    const fetched = await getJson(request, `/appointments/${appt.id}`);
    expect(fetched.doctor_id).toBe(doctor.id);
    expect(fetched.status).toBe('scheduled');
  });

  test('REQ-026 rejects a doctor outside the selected department (relationship rule)', async ({ request }) => {
    const [patients, doctors, departments] = await Promise.all([
      getJson(request, '/patients'),
      getJson(request, '/doctors'),
      getJson(request, '/departments'),
    ]);
    const doctor = doctors[0];
    const otherDept = departments.find((d: any) => d.id !== doctor.department_id);
    const res = await request.post(`${API}/appointments`, {
      data: appointmentPayload(patients[0].id, doctor.id, otherDept.id),
    });
    expect(
      res.status(),
      'doctor not in the selected department must be rejected',
    ).toBeGreaterThanOrEqual(400);
  });

  test('REQ-035 filters appointments by status', async ({ request }) => {
    const filtered = await getJson(request, '/appointments?status=scheduled');
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((a: any) => a.status === 'scheduled')).toBeTruthy();
  });

  test('REQ-035 filters appointments by department', async ({ request }) => {
    const all = await getJson(request, '/appointments');
    const deptId = all[0].department_id;
    const filtered = await getJson(request, `/appointments?department_id=${deptId}`);
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((a: any) => a.department_id === deptId)).toBeTruthy();
  });

  test('REQ-035 filters appointments by doctor', async ({ request }) => {
    const all = await getJson(request, '/appointments');
    const doctorId = all[0].doctor_id;
    const filtered = await getJson(request, `/appointments?doctor_id=${doctorId}`);
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((a: any) => a.doctor_id === doctorId)).toBeTruthy();
  });

  test('REQ-034 transitions an appointment status to cancelled', async ({ request }) => {
    const scheduled = (await getJson(request, '/appointments?status=scheduled'))[0];
    const patch = await request.patch(`${API}/appointments/${scheduled.id}/status`, {
      data: { status: 'cancelled' },
    });
    expect(patch.ok()).toBeTruthy();
    const fetched = await getJson(request, `/appointments/${scheduled.id}`);
    expect(fetched.status).toBe('cancelled');
  });

  // REQ-031 / REQ-032: appointment_type, priority, and status are constrained enums.
  for (const [field, badValue] of [
    ['appointment_type', 'bogus-type'],
    ['priority', 'bogus-priority'],
  ] as const) {
    test(`REQ-031 REQ-032 rejects an invalid ${field} value`, async ({ request }) => {
      const [patients, doctors] = await Promise.all([
        getJson(request, '/patients'),
        getJson(request, '/doctors'),
      ]);
      const doctor = doctors[0];
      const res = await request.post(`${API}/appointments`, {
        data: appointmentPayload(patients[0].id, doctor.id, doctor.department_id, {
          [field]: badValue,
        }),
      });
      expect(res.status(), `invalid ${field} must be rejected`).toBeGreaterThanOrEqual(400);
    });
  }

  test('REQ-031 rejects an invalid status transition value', async ({ request }) => {
    const scheduled = (await getJson(request, '/appointments?status=scheduled'))[0];
    const patch = await request.patch(`${API}/appointments/${scheduled.id}/status`, {
      data: { status: 'teleported' },
    });
    expect(patch.status(), 'an invalid status value must be rejected').toBeGreaterThanOrEqual(400);
  });
});
