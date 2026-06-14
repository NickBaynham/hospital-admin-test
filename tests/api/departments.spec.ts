import { test, expect } from '../fixtures';
import { API, getJson } from './_helpers';

/**
 * Departments coverage (functional). The app exposes only GET (list) and POST —
 * no id-level GET/PUT/DELETE (a deviation from full CRUD). Auto-reset via fixtures.
 */
test.describe('Departments API', () => {
  test('REQ-045 lists the seeded departments', async ({ seeded }) => {
    expect(seeded.departments.length).toBeGreaterThanOrEqual(4);
    expect(seeded.departments.every((d) => d.id && d.name)).toBeTruthy();
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
