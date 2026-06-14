import { test, expect } from '@playwright/test';
import { API, reset, getJson } from '../api/_helpers';

/**
 * BUG-08 / REQ-008: a department name must be unique. The app accepts duplicate names.
 * This asserts the correct behavior, so it currently FAILS (red) until uniqueness is enforced.
 * Sequential, single global DB — run via `npm run test:regression`.
 */
test.describe('Department uniqueness regression (known defect)', () => {
  test.beforeEach(async ({ request }) => {
    await reset(request);
  });

  test.afterAll(async ({ request }) => {
    await reset(request);
  });

  test('BUG-08: a duplicate department name is rejected', async ({ request }) => {
    const existing = (await getJson(request, '/departments'))[0];
    const res = await request.post(`${API}/departments`, { data: { name: existing.name } });
    expect(
      res.status(),
      'creating a department with an existing name should be rejected (>= 400)',
    ).toBeGreaterThanOrEqual(400);
  });
});
