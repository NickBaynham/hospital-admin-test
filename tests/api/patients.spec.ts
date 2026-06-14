import { test, expect } from '../fixtures';
import { API, getJson, patientPayload } from './_helpers';
import { patientValidationCases } from '../data/validation-cases';

/**
 * Patients coverage (functional). Auto-reset + seed data via fixtures.
 * Validation cases are data-driven from tests/data/validation-cases.ts.
 * Run via `npm run test:api`.
 */
test.describe('Patients API', () => {
  test('REQ-023 lists the seeded patients', async ({ seeded }) => {
    expect(seeded.patients.length).toBeGreaterThanOrEqual(3);
    expect(seeded.patients.every((p) => typeof p.id === 'string' && p.name)).toBeTruthy();
  });

  test('REQ-016 creates a patient and reads it back', async ({ request }) => {
    const body = patientPayload({ name: 'Grace Hopper' });
    const created = await request.post(`${API}/patients`, { data: body });
    expect(created.status(), 'valid patient should be created').toBe(201);
    const patient = await created.json();
    expect(patient.id).toBeTruthy();

    const fetched = await getJson(request, `/patients/${patient.id}`);
    expect(fetched.name).toBe('Grace Hopper');
    expect(fetched.email).toBe(body.email);

    const list = await getJson(request, '/patients');
    expect(list.some((p: any) => p.id === patient.id)).toBeTruthy();
  });

  test('REQ-024 updates a patient', async ({ request }) => {
    const created = await (await request.post(`${API}/patients`, { data: patientPayload() })).json();
    const update = await request.put(`${API}/patients/${created.id}`, {
      data: patientPayload({ name: 'Updated Name', email: created.email }),
    });
    expect(update.ok()).toBeTruthy();
    const fetched = await getJson(request, `/patients/${created.id}`);
    expect(fetched.name).toBe('Updated Name');
  });

  test('REQ-045 deletes a patient that has no appointments', async ({ request }) => {
    const created = await (await request.post(`${API}/patients`, { data: patientPayload() })).json();
    const del = await request.delete(`${API}/patients/${created.id}`);
    expect(del.ok(), 'a patient with no appointments should be deletable').toBeTruthy();
    const list = await getJson(request, '/patients');
    expect(list.some((p: any) => p.id === created.id)).toBeFalsy();
  });

  test('REQ-054 preserves referential integrity: cannot delete a patient with appointments', async ({
    request,
    seeded,
  }) => {
    const patientWithAppt = seeded.appointments[0].patient_id;
    const del = await request.delete(`${API}/patients/${patientWithAppt}`);
    expect(
      del.status(),
      'deleting a patient with appointments must be rejected (no orphans, REQ-054)',
    ).toBeGreaterThanOrEqual(400);
  });

  test.describe('validation (negative, data-driven)', () => {
    for (const tc of patientValidationCases) {
      test(`${tc.req} patient create rejects/accepts: ${tc.name}`, async ({ request, seeded }) => {
        const patch = { ...tc.patch };
        if (patch.email === '__dupEmail') patch.email = seeded.patients[0].email;
        const res = await request.post(`${API}/patients`, { data: patientPayload(patch) });
        if (tc.expectReject) {
          expect(res.status(), `${tc.name} should be rejected`).toBeGreaterThanOrEqual(400);
        } else {
          expect(res.status(), `${tc.name} should be accepted`).toBe(201);
        }
      });
    }
  });
});
