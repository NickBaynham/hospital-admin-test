import { test, expect } from '@playwright/test';
import { API, reset, getJson, doctorPayload } from './_helpers';

/**
 * Doctors coverage (functional). These assert implemented behavior and should PASS.
 * Sequential, single global DB — run via `npm run test:api`.
 */
test.describe('Doctors API', () => {
  test.beforeEach(async ({ request }) => {
    await reset(request);
  });

  test.afterAll(async ({ request }) => {
    await reset(request);
  });

  test('lists the seeded doctors', async ({ request }) => {
    const doctors = await getJson(request, '/doctors');
    expect(doctors.length).toBeGreaterThanOrEqual(4);
    expect(doctors.every((d: any) => d.id && d.name && d.department_id)).toBeTruthy();
  });

  test('creates a doctor and reads it back', async ({ request }) => {
    const departments = await getJson(request, '/departments');
    const body = doctorPayload(departments[0].id, { name: 'Dr. Ada Lovelace' });
    const created = await request.post(`${API}/doctors`, { data: body });
    expect(created.status(), 'valid doctor should be created').toBe(201);
    const doctor = await created.json();

    const fetched = await getJson(request, `/doctors/${doctor.id}`);
    expect(fetched.name).toBe('Dr. Ada Lovelace');
    expect(fetched.department_id).toBe(departments[0].id);
  });

  test('filters doctors by department', async ({ request }) => {
    const departments = await getJson(request, '/departments');
    const deptId = departments[0].id;
    const filtered = await getJson(request, `/doctors?department_id=${deptId}`);
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((d: any) => d.department_id === deptId)).toBeTruthy();
  });

  test('rejects a doctor with a nonexistent department', async ({ request }) => {
    const res = await request.post(`${API}/doctors`, {
      data: doctorPayload('000000000000000000000000'),
    });
    expect(
      res.status(),
      'a doctor referencing a nonexistent department must be rejected',
    ).toBeGreaterThanOrEqual(400);
  });

  test('rejects a doctor with a duplicate email', async ({ request }) => {
    const [departments, doctors] = await Promise.all([
      getJson(request, '/departments'),
      getJson(request, '/doctors'),
    ]);
    const res = await request.post(`${API}/doctors`, {
      data: doctorPayload(departments[0].id, { email: doctors[0].email }),
    });
    expect(res.status(), 'duplicate doctor email must be rejected').toBeGreaterThanOrEqual(400);
  });

  test('deletes a doctor that has no appointments', async ({ request }) => {
    const departments = await getJson(request, '/departments');
    const created = await (
      await request.post(`${API}/doctors`, { data: doctorPayload(departments[0].id) })
    ).json();
    const del = await request.delete(`${API}/doctors/${created.id}`);
    expect(del.ok(), 'a doctor with no appointments should be deletable').toBeTruthy();
    const list = await getJson(request, '/doctors');
    expect(list.some((d: any) => d.id === created.id)).toBeFalsy();
  });

  test('preserves referential integrity: cannot delete a doctor with appointments', async ({ request }) => {
    const appointments = await getJson(request, '/appointments');
    expect(appointments.length).toBeGreaterThan(0);
    const doctorWithAppt = appointments[0].doctor_id;
    const del = await request.delete(`${API}/doctors/${doctorWithAppt}`);
    expect(
      del.status(),
      'deleting a doctor with appointments must be rejected (no orphans)',
    ).toBeGreaterThanOrEqual(400);
  });
});
