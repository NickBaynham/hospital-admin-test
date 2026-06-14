import { test, expect } from '../fixtures';
import { API, getJson, patientPayload } from '../api/_helpers';

/**
 * Patient known defects. Each asserts the correct behavior, so it FAILS (red) until
 * fixed. Auto-reset via fixtures. Run via `npm run test:regression`.
 */
test.describe('Patient search regression (known defect)', () => {
  test('BUG-06 REQ-047: searching patients by name returns only matches', async ({ request }) => {
    const marker = `Zylander${Date.now()}`;
    const created = await request.post(`${API}/patients`, {
      data: patientPayload({ name: `${marker} Smith` }),
    });
    expect(created.ok()).toBeTruthy();

    const results = await getJson(request, `/patients?search=${marker}`);
    expect(
      results.length,
      'search should return only the matching patient, not the whole table',
    ).toBe(1);
    expect(results[0].name).toContain(marker);
  });

  // BUG-07 / REQ-018: a future date of birth must be rejected. The app accepts it.
  test('BUG-07 REQ-018: a future date of birth is rejected', async ({ request }) => {
    const res = await request.post(`${API}/patients`, {
      data: patientPayload({ date_of_birth: '2999-01-01' }),
    });
    expect(
      res.status(),
      'a future date of birth should be rejected (>= 400), not accepted',
    ).toBeGreaterThanOrEqual(400);
  });

  // BUG-09 / REQ-020: an invalid phone format must be rejected. The app accepts any string.
  test('BUG-09 REQ-020: an invalid phone format is rejected', async ({ request }) => {
    const res = await request.post(`${API}/patients`, {
      data: patientPayload({ phone: '!!!not-a-phone!!!' }),
    });
    expect(
      res.status(),
      'an invalid phone format should be rejected (>= 400), not accepted',
    ).toBeGreaterThanOrEqual(400);
  });
});

