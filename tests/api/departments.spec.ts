import { test, expect } from '@playwright/test';
import { API, reset, getJson } from './_helpers';

/**
 * Departments coverage (functional). The app exposes only GET (list) and POST — there is
 * no id-level GET/PUT/DELETE (a deviation from full CRUD). These assert implemented
 * behavior and should PASS. Sequential, single global DB — run via `npm run test:api`.
 */
test.describe('Departments API', () => {
  test.beforeEach(async ({ request }) => {
    await reset(request);
  });

  test.afterAll(async ({ request }) => {
    await reset(request);
  });

  test('REQ-045 lists the seeded departments', async ({ request }) => {
    const departments = await getJson(request, '/departments');
    expect(departments.length).toBeGreaterThanOrEqual(4);
    expect(departments.every((d: any) => d.id && d.name)).toBeTruthy();
  });

  test('REQ-007 creates a department with a unique name', async ({ request }) => {
    const before = (await getJson(request, '/departments')).length;
    const res = await request.post(`${API}/departments`, { data: { name: 'Oncology' } });
    expect(res.status(), 'a department with a unique name should be created').toBe(201);

    const after = await getJson(request, '/departments');
    expect(after.length).toBe(before + 1);
    expect(after.some((d: any) => d.name === 'Oncology')).toBeTruthy();
  });
});
