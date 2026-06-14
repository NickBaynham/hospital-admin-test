import { test, expect } from '../fixtures';
import { API, getJson } from '../api/_helpers';

/**
 * BUG-08 / REQ-008: a department name must be unique. The app accepts duplicate names,
 * so this FAILS (red) until uniqueness is enforced. Auto-reset via fixtures.
 */
test.describe('Department uniqueness regression (known defect)', () => {
  test('BUG-08 REQ-008: a duplicate department name is rejected', async ({ request }) => {
    const existing = (await getJson(request, '/departments'))[0];
    const res = await request.post(`${API}/departments`, { data: { name: existing.name } });
    expect(
      res.status(),
      'creating a department with an existing name should be rejected (>= 400)',
    ).toBeGreaterThanOrEqual(400);
  });
});
