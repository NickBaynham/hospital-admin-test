# Hospital Admin System Testing

This repository is a companion to the hospital-admin application and provides the
system automated tests.

## Overview

- Test automation tool: Playwright
- Language: TypeScript
- Application under test: `../hospital-admin` (FastAPI + MongoDB backend, React frontend)
- Test plan: [testplan/testplan.md](testplan/testplan.md)

## Prerequisites

The application stack must be running before the tests:

```bash
cd ../hospital-admin && make docker-up
```

This serves the API on http://localhost:8000 and the frontend on http://localhost:5173.

## Running tests

```bash
npm ci
npx playwright install --with-deps

npm run test:api          # functional API tests
npm run test:ui           # UI end-to-end tests
npm run test:ci           # functional gate: API + UI (used in CI)
npm run test:regression   # known-defect tests (red until the app is fixed)
```

All suites share one backend database (`POST /test-data/reset` regenerates document
IDs), so every project runs with `--workers=1`. See [the test plan](testplan/testplan.md)
section 10 for the isolation constraint.

## Test layout

| Layer | Location | Project |
| --- | --- | --- |
| Functional API | `tests/api/` | `api` |
| Regression (known defects) | `tests/regression/` | `api` |
| UI end-to-end | `tests/ui/` | `ui` |

### Fixtures and data-driven tests

- `tests/fixtures.ts` — the shared Playwright fixture. An auto `resetDb` fixture seeds a
  known state before every test (no per-spec `beforeEach`), and a `seeded` fixture exposes
  the seed entities as typed data: `async ({ seeded }) => seeded.doctors[0]`.
- `tests/data/validation-cases.ts` — data tables that drive validation tests. Add a row to
  add a test; each row carries its `REQ-` id so run-results coverage still links it. Used by
  `tests/api/patients.spec.ts` and `tests/api/appointments.spec.ts`.
- `tests/api/_helpers.ts` — request helpers (`getJson`) and valid-payload builders
  (`patientPayload`, `doctorPayload`, `appointmentPayload`) for overrides.

## Continuous integration

`.github/workflows/playwright.yml` checks out the application repo, starts its Docker
Compose stack, waits for health, then runs the functional gate (`test:ci`) as a blocking
step and the regression watch as a non-blocking step (those tests are red by design). If
the application repo is private, add a read-access PAT as the `APP_REPO_TOKEN` secret.
