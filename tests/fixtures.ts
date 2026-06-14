import { test as base, expect, type APIRequestContext } from '@playwright/test';
import { API, getJson } from './api/_helpers';
import { DbClient } from './db';

/**
 * Shared test fixtures for the whole suite.
 *
 * - `resetDb` (auto): every test starts from the known seed. This replaces the
 *   per-spec `beforeEach(reset)` boilerplate. The suite shares one backend DB and
 *   `POST /test-data/reset` regenerates all document IDs, so tests run --workers=1
 *   (configured per project) and fetch IDs at runtime.
 * - `seeded`: the seed entities, fetched after the reset, as typed data — so tests
 *   say `seeded.doctors[0]` instead of re-fetching in every body.
 */

export type Entity = { id: string; [key: string]: any };

export interface Seeded {
  api: string;
  patients: Entity[];
  doctors: Entity[];
  departments: Entity[];
  appointments: Entity[];
}

export const test = base.extend<{ resetDb: void; seeded: Seeded }, { db: DbClient }>({
  // Worker-scoped: one MongoDB connection per worker, for database-layer assertions.
  db: [
    async ({}, use) => {
      const client = await DbClient.connect();
      await use(client);
      await client.close();
    },
    { scope: 'worker' },
  ],

  resetDb: [
    async ({ request }, use) => {
      const res = await request.post(`${API}/test-data/reset`);
      expect(res.ok(), 'reset seed should succeed').toBeTruthy();
      await use();
    },
    { auto: true },
  ],

  seeded: async ({ request, resetDb }, use) => {
    void resetDb; // ensure the reset runs before we read the seed
    const [patients, doctors, departments, appointments] = await Promise.all([
      getJson<Entity[]>(request, '/patients'),
      getJson<Entity[]>(request, '/doctors'),
      getJson<Entity[]>(request, '/departments'),
      getJson<Entity[]>(request, '/appointments'),
    ]);
    await use({ api: API, patients, doctors, departments, appointments });
  },
});

export { expect };
export type { APIRequestContext };
