import { test, expect } from '@playwright/test';
import { API, reset, getJson, patientPayload } from './_helpers';

/**
 * Patients coverage (functional). These assert the implemented behavior and should PASS.
 * Sequential, single global DB — run via `npm run test:api`.
 */
test.describe('Patients API', () => {
  test.beforeEach(async ({ request }) => {
    await reset(request);
  });

  test.afterAll(async ({ request }) => {
    await reset(request);
  });

  test('REQ-023 lists the seeded patients', async ({ request }) => {
    const patients = await getJson(request, '/patients');
    expect(patients.length).toBeGreaterThanOrEqual(3);
    expect(patients.every((p: any) => typeof p.id === 'string' && p.name)).toBeTruthy();
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

  test('REQ-054 preserves referential integrity: cannot delete a patient with appointments', async ({ request }) => {
    const appointments = await getJson(request, '/appointments');
    expect(appointments.length).toBeGreaterThan(0);
    const patientWithAppt = appointments[0].patient_id;
    const del = await request.delete(`${API}/patients/${patientWithAppt}`);
    expect(
      del.status(),
      'deleting a patient with appointments must be rejected (no orphans, REQ-054)',
    ).toBeGreaterThanOrEqual(400);
  });

  test.describe('validation (negative)', () => {
    test('REQ-019 rejects a duplicate email', async ({ request }) => {
      const existing = (await getJson(request, '/patients'))[0];
      const res = await request.post(`${API}/patients`, {
        data: patientPayload({ email: existing.email }),
      });
      expect(res.status(), 'duplicate email should be rejected').toBeGreaterThanOrEqual(400);
    });

    test('REQ-017 rejects an invalid email format', async ({ request }) => {
      const res = await request.post(`${API}/patients`, {
        data: patientPayload({ email: 'not-an-email' }),
      });
      expect(res.status()).toBeGreaterThanOrEqual(400);
    });

    // Note: future-date-of-birth rejection is a KNOWN DEFECT (the app accepts it).
    // It is covered as a red regression test in tests/regression/patients.regression.spec.ts (BUG-07).
  });
});
