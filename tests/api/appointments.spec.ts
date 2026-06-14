import { test, expect } from '../fixtures';
import { API, getJson, appointmentPayload } from './_helpers';
import { appointmentEnumCases } from '../data/validation-cases';

/**
 * Appointment scheduling: happy path, relationship rule, filters, status
 * transitions, and enum validation. Auto-reset + seed data via fixtures.
 */
test.describe('Appointments API', () => {
  test('REQ-025 creates a valid future appointment and reads it back', async ({ request, seeded }) => {
    const doctor = seeded.doctors[0];
    const res = await request.post(`${API}/appointments`, {
      data: appointmentPayload(seeded.patients[0].id, doctor.id, doctor.department_id),
    });
    expect(res.status(), 'valid appointment should be created').toBe(201);
    const appt = await res.json();
    const fetched = await getJson(request, `/appointments/${appt.id}`);
    expect(fetched.doctor_id).toBe(doctor.id);
    expect(fetched.status).toBe('scheduled');
  });

  test('REQ-026 rejects a doctor outside the selected department (relationship rule)', async ({
    request,
    seeded,
  }) => {
    const doctor = seeded.doctors[0];
    const otherDept = seeded.departments.find((d) => d.id !== doctor.department_id)!;
    const res = await request.post(`${API}/appointments`, {
      data: appointmentPayload(seeded.patients[0].id, doctor.id, otherDept.id),
    });
    expect(res.status(), 'doctor not in the selected department must be rejected').toBeGreaterThanOrEqual(400);
  });

  test('REQ-035 filters appointments by status', async ({ request }) => {
    const filtered = await getJson(request, '/appointments?status=scheduled');
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((a: any) => a.status === 'scheduled')).toBeTruthy();
  });

  test('REQ-035 filters appointments by department', async ({ request, seeded }) => {
    const deptId = seeded.appointments[0].department_id;
    const filtered = await getJson(request, `/appointments?department_id=${deptId}`);
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((a: any) => a.department_id === deptId)).toBeTruthy();
  });

  test('REQ-035 filters appointments by doctor', async ({ request, seeded }) => {
    const doctorId = seeded.appointments[0].doctor_id;
    const filtered = await getJson(request, `/appointments?doctor_id=${doctorId}`);
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((a: any) => a.doctor_id === doctorId)).toBeTruthy();
  });

  test('REQ-034 transitions an appointment status to cancelled', async ({ request, seeded, db }) => {
    const scheduled = seeded.appointments.find((a) => a.status === 'scheduled')!;
    const patch = await request.patch(`${API}/appointments/${scheduled.id}/status`, {
      data: { status: 'cancelled' },
    });
    expect(patch.ok()).toBeTruthy();
    const fetched = await getJson(request, `/appointments/${scheduled.id}`);
    expect(fetched.status).toBe('cancelled');

    // DB assertion: the status change is persisted in MongoDB.
    const stored = await db.findById('appointments', scheduled.id);
    expect(stored!.status, 'status update must persist').toBe('cancelled');
  });

  // REQ-031 / REQ-032: appointment_type and priority are constrained enums (data-driven).
  for (const { field, badValue } of appointmentEnumCases) {
    test(`REQ-031 REQ-032 rejects an invalid ${field} value`, async ({ request, seeded }) => {
      const doctor = seeded.doctors[0];
      const res = await request.post(`${API}/appointments`, {
        data: appointmentPayload(seeded.patients[0].id, doctor.id, doctor.department_id, {
          [field]: badValue,
        }),
      });
      expect(res.status(), `invalid ${field} must be rejected`).toBeGreaterThanOrEqual(400);
    });
  }

  test('REQ-031 rejects an invalid status transition value', async ({ request, seeded }) => {
    const scheduled = seeded.appointments.find((a) => a.status === 'scheduled')!;
    const patch = await request.patch(`${API}/appointments/${scheduled.id}/status`, {
      data: { status: 'teleported' },
    });
    expect(patch.status(), 'an invalid status value must be rejected').toBeGreaterThanOrEqual(400);
  });
});
