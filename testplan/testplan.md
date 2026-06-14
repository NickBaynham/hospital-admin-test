# Test Plan: Hospital Appointment Management

> Template test plan. Replace the bracketed `[...]` placeholders. Sections pre-filled
> from the current requirements and the CH-001 exploration are marked _(pre-filled)_;
> review and adjust them rather than treating them as final.

| Field | Value |
| --- | --- |
| Document owner | [name] |
| Status | Draft |
| Last updated | [YYYY-MM-DD] |
| Application under test | Hospital Appointment Management (`../hospital-admin`) |
| Version / build | [git sha or tag] |

## 1. Introduction

[One paragraph: what this plan covers and why. The application is a full-stack hospital
appointment management system used as a QA automation target — React + Vite frontend,
FastAPI + Motor backend, MongoDB. This plan defines how its quality is verified across
the UI, API, and database layers.]

## 2. Objectives

- Verify the core workflows: manage departments, doctors, patients, and appointments.
- Confirm the documented validation and relationship rules hold.
- Catch regressions in the known-defect areas before release.
- Verify cross-layer data integrity: a record created or changed through the UI or API
  persists correctly in MongoDB with the correct relationship references.
- Confirm referential integrity: deleting an entity leaves no orphaned appointment
  references (REQ-054).
- Validate test isolation: `POST /test-data/reset` reliably restores a known seed so each
  run starts from a deterministic state (REQ-052, REQ-053).
- Achieve full requirements traceability: every REQ-NNN maps to at least one executed test.
- Exercise the breadth of UI controls that make this a QA target: dropdowns, radio buttons,
  date/time fields, search and filters, and the dynamic department to doctor dependency.
- Confirm API contract conformance: correct HTTP status codes and response schemas,
  including negative and error cases.
- Verify dashboard accuracy: summary counts and lists reflect the underlying data after
  create, cancel, and status-change operations.
- Distinguish intentional seeded defects from genuine regressions, so a known defect does
  not mask a new one.

## 3. Scope

### 3.1 In scope _(pre-filled)_

- Dashboard summary counts and upcoming-appointments list.
- Patients: list, search, filter, create, edit, detail.
- Doctors: list, search, filter by department, create, edit, active/inactive.
- Appointments: list, filters, create (department to doctor dependency), status transitions, cancel.
- REST API CRUD for departments, doctors, patients, appointments.
- Database persistence and relationship integrity.
- Seed/reset endpoints (`POST /test-data/reset`).

### 3.2 Out of scope

- Authentication / authorization (the app is currently mocked / role-free).
- Visual styling and responsive-layout testing.
- Performance and load testing. [Adjust if required.]
- [Other exclusions.]

## 4. References

| Reference | Location |
| --- | --- |
| Source requirements (narrative) | [requirements/requirements.md](../requirements/requirements.md) |
| Structured requirements (REQ-NNN) | [requirements-structured.md](../.test-commander/documents/uploaded/requirements-structured.md) |
| Requirements review | [requirements-review.md](../.test-commander/requirements/requirements-review.md) |
| Test-idea seeds (54) | [.test-commander/test-ideas/](../.test-commander/test-ideas/) |
| Coverage matrix (requirements) | [requirements-coverage.md](../.test-commander/requirements/requirements-coverage.md) |
| Coverage map (requirement -> test) | [coverage-map.md](coverage-map.md) |
| Exploration session CH-001 | [SESS-20260613-420.md](../.test-commander/sessions/SESS-20260613-420.md) |
| App API reference | [hospital-admin/docs/api.md](../../hospital-admin/docs/api.md) |
| App testing notes | [hospital-admin/docs/testing.md](../../hospital-admin/docs/testing.md) |

## 5. Test approach

### 5.1 Test layers

| Layer | Tooling | Targets |
| --- | --- | --- |
| UI (E2E) | Playwright | Forms, dropdown dependencies, validation messages, tables, navigation |
| API | PyTest + httpx (or Playwright APIRequest) | CRUD, status codes, schema, negative cases, query filters |
| Database | Direct MongoDB assertions | Persistence, relationship references, reset/seed, no orphans |

### 5.2 Test types

Functional, validation/negative, relationship/dependency, regression (known defects),
data-integrity, and smoke. [Add or remove as needed.]

### 5.3 Entry criteria

- App builds and starts via `make docker-up`; `GET /health` returns ok.
- Database can be reset to a known seed via `POST /test-data/reset`.
- [Build deployed to the test environment.]

### 5.4 Exit criteria

- All planned high-priority cases executed.
- No open high-severity defects (or each has a documented waiver).
- [Coverage threshold, e.g. all critical requirements have at least one passing test.]

## 6. Test environment

| Item | Value |
| --- | --- |
| Frontend URL | http://localhost:5173 |
| API base URL | http://localhost:8000 |
| Database | MongoDB (docker service `mongo`) |
| Startup | `make docker-up` (builds, waits for API) |
| Reset to seed | `POST /test-data/reset` or `make db-reset` |
| Seed baseline | 4 departments, 4 doctors, 3 patients, 3 appointments |

### 6.1 Build under test (recorded in every report)

Each run records which build of the application was tested, via a Playwright global
setup (`tests/global-setup.ts`) that writes report metadata (HTML report header and
`playwright-report/results.json` under `config.metadata`) and logs it to the run output.

| Field | Source |
| --- | --- |
| `appApiVersion` | Queried live from `GET /openapi.json` -> `info.version` |
| `appGitSha` | `APP_GIT_SHA` env (CI: `git rev-parse HEAD` of the app checkout) |
| `appBackendImage` / `appFrontendImage` | `APP_*_IMAGE` env (CI: `docker inspect --format '{{.Id}}'`) — the image digests that built the containers |
| `ciBuildId` | `GITHUB_RUN_ID` (or `BUILD_ID`); `local` when run off-CI |
| `testedAt` | Run timestamp |

Identifiers the test process cannot self-discover are supplied by the orchestrator
(CI workflow / local shell) as environment variables and recorded as `unknown` when absent.

## 7. Test data

- Each test starts from a known state via `POST /test-data/reset`.
- Reference seed entities: departments (Cardiology, Pediatrics, Orthopedics, Neurology);
  doctors (Dr. Sarah Chen, Dr. James Patel, Dr. Elena Rivera, Dr. Marcus Lee).
- [Define any additional fixtures or factories.]

## 8. Test scenarios

Authoritative scenario list lives as one seed file per requirement under
`.test-commander/test-ideas/REQ-NNN.md`. Summarize coverage here by area.

Priority key: P1 = critical path / high business risk, P2 = important, P3 = peripheral.
Status: Not started / In progress / Partial / Automated.

| Area | Key requirements | Priority | Status |
| --- | --- | --- | --- |
| Appointment scheduling | REQ-025..036 | P1 | Automated — happy/relationship/filters/status pass; BUG-01..03 red |
| Patients | REQ-016..024 | P1 | Automated — CRUD + validation pass; BUG-06/07 red |
| API CRUD / filters | REQ-043..049 | P1 | Partial — appointment + patient endpoints covered; doctors/departments pending |
| Doctors | REQ-010..015 | P2 | Automated — CRUD, department filter, validation, referential integrity pass |
| Database / seed integrity | REQ-050..054 | P2 | Partial — referential integrity on patient and doctor delete covered |
| Dashboard | REQ-037..042 | P3 | Automated (UI) — counts, upcoming list, cancellation reflection |

Test layout (all under one shared backend DB, so each project pins `--workers=1`):

| Layer | Location | Project | Script |
| --- | --- | --- | --- |
| Functional API | `tests/api/` | `api` | `npm run test:api` |
| Regression (known defects) | `tests/regression/` | `api` | `npm run test:regression` |
| UI end-to-end | `tests/ui/` | `ui` | `npm run test:ui` |

### 8.1 Scenario detail template

```
ID:          TC-[area]-[nn]
Requirement: REQ-NNN
Title:       [short description]
Priority:    [High | Medium | Low]
Layer:       [UI | API | DB]
Type:        [functional | negative | relationship | regression]
Preconditions: [seeded state, specific entity]
Steps:
  1. [step]
  2. [step]
Expected:    [observable result, status code, DB state]
```

### 8.2 API tests

Functional API tests (`tests/api/`, project `api`, `npm run test:api`). Every test resets
to the seed first (4 departments, 4 doctors, 3 patients, 3 appointments). Status reflects
the current run against the app. All IDs are stable references for traceability.

| ID | Name | Description | Test Data | Status |
| --- | --- | --- | --- | --- |
| API-APPT-01 | Create valid future appointment | Creates an appointment for a future date and reads it back; expects 201 and status `scheduled` | Seed patient + seed doctor in its own department; date 2030-05-20, time 11:00 | Pass |
| API-APPT-02 | Reject doctor outside department | Booking a doctor not in the selected department is rejected | Seed doctor + a different seed department | Pass |
| API-APPT-03 | Filter by status | `GET /appointments?status=scheduled` returns only scheduled rows | Seed appointments | Pass |
| API-APPT-04 | Filter by department | `GET /appointments?department_id=` returns only that department | Seed appointments | Pass |
| API-APPT-05 | Filter by doctor | `GET /appointments?doctor_id=` returns only that doctor | Seed appointments | Pass |
| API-APPT-06 | Transition status to cancelled | `PATCH /appointments/{id}/status` to `cancelled` persists | A seeded scheduled appointment | Pass |
| API-APPT-07 | Reject invalid appointment_type | Non-enum `appointment_type` is rejected (>=400) | Valid payload + `appointment_type=bogus-type` | Pass |
| API-APPT-08 | Reject invalid priority | Non-enum `priority` is rejected (>=400) | Valid payload + `priority=bogus-priority` | Pass |
| API-APPT-09 | Reject invalid status value | `PATCH .../status` with a non-enum value is rejected | Seeded scheduled appointment + `status=teleported` | Pass |
| API-PAT-01 | List seeded patients | Patient list returns the seed set with id+name | Seed patients | Pass |
| API-PAT-02 | Create and read back patient | Creates a valid patient and re-fetches by id | name Grace Hopper, valid email, insurance `Blue Shield` | Pass |
| API-PAT-03 | Update patient | `PUT /patients/{id}` changes a field | Created patient, name -> Updated Name | Pass |
| API-PAT-04 | Delete patient without appointments | A patient with no appointments is deletable | Freshly created patient | Pass |
| API-PAT-05 | Referential integrity on delete | Deleting a patient that has appointments is rejected | A seed patient referenced by a seed appointment | Pass |
| API-PAT-06 | Reject duplicate email | Duplicate patient email is rejected | Existing seed patient email | Pass |
| API-PAT-07 | Reject invalid email format | Malformed email is rejected | `not-an-email` | Pass |
| API-DOC-01 | List seeded doctors | Doctor list returns the seed set | Seed doctors | Pass |
| API-DOC-02 | Create and read back doctor | Creates a valid doctor and re-fetches by id | name Dr. Ada Lovelace, seed department | Pass |
| API-DOC-03 | Filter by department | `GET /doctors?department_id=` returns only that department | Seed doctors | Pass |
| API-DOC-04 | Reject nonexistent department | Doctor referencing an unknown department is rejected | `department_id=000000000000000000000000` | Pass |
| API-DOC-05 | Reject duplicate email | Duplicate doctor email is rejected | Existing seed doctor email | Pass |
| API-DOC-06 | Delete doctor without appointments | A doctor with no appointments is deletable | Freshly created doctor | Pass |
| API-DOC-07 | Referential integrity on delete | Deleting a doctor that has appointments is rejected | A seed doctor referenced by a seed appointment | Pass |
| API-DEPT-01 | List seeded departments | Department list returns the seed set | Seed departments | Pass |
| API-DEPT-02 | Create department (unique name) | Creates a department with a new name; expects 201 and list grows | name Oncology | Pass |

### 8.3 UI tests

End-to-end UI tests (`tests/ui/`, project `ui`, `npm run test:ui`) driven through the React
frontend with `data-testid` selectors. Every test resets to the seed first.

| ID | Name | Description | Test Data | Status |
| --- | --- | --- | --- | --- |
| UI-DASH-01 | Dashboard summary counts | Dashboard shows seeded counts (patients 3, doctors 4, appointments 3, scheduled 2) | Seed | Pass |
| UI-DASH-02 | Upcoming appointments list | Upcoming table shows the two scheduled future appointments | Seed (John Smith, Maria Garcia) | Pass |
| UI-DASH-03 | Cancellation reflected | After cancelling an appointment, scheduled count drops 2->1 and the row leaves upcoming | Seed scheduled appointment cancelled via API | Pass |
| UI-APPT-01 | Department -> doctor filter | Doctor dropdown is disabled until a department is chosen, then lists only that department's doctors and refreshes on change | Cardiology -> Dr. Sarah Chen; Pediatrics -> Dr. James Patel | Pass |
| UI-APPT-02 | Create appointment happy path | Fills and submits the form, redirects to the list, and the new row is shown | Pediatrics / Dr. James Patel / John Smith / 2030-08-15 09:00 | Pass |
| UI-VAL-01 | Patient duplicate email error | Patient form surfaces a server error in `error-message`; no patient added | Existing email john.smith@example.com | Pass |
| UI-VAL-02 | Doctor duplicate email error | Doctor form surfaces a server error in `error-message`; no doctor added | Existing email sarah.chen@example.com | Pass |
| UI-VAL-03 | Symptoms too short | Appointment form shows client error "Symptoms must be at least 10 characters"; no create | Valid appointment + symptoms `short` | Pass |
| UI-VAL-04 | Required-field guard | Submitting with a required field (priority) unset does not navigate or create (native HTML5 validation) | Valid appointment minus priority | Pass |

### 8.4 Regression tests (known defects)

Red-by-design tests (`tests/regression/`, project `api`, `npm run test:regression`). Each
asserts the correct behavior and therefore fails until the underlying defect is fixed; see
section 9. Status `Fail (by design)` means the defect is still present.

| ID | Name | Description | Test Data | Status |
| --- | --- | --- | --- | --- |
| BUG-01 | Past date rejected | A past appointment date must be rejected | Seed patient/doctor; date 2020-01-01 | Fail (by design) |
| BUG-02 | Inactive doctor not bookable | An inactive doctor must not be bookable | Seed doctor set `active=false`; future date | Fail (by design) |
| BUG-03 | No double-booking | The same doctor must not be double-booked at the same date and time | Existing seed appointment's doctor + slot | Fail (by design) |
| BUG-06 | Patient search filters | `GET /patients?search=` must return only matches | New patient with a unique name marker | Fail (by design) |
| BUG-07 | Future DOB rejected | A future date of birth must be rejected | Patient with date_of_birth 2999-01-01 | Fail (by design) |
| BUG-08 | Unique department name | A duplicate department name must be rejected | Existing seed department name | Fail (by design) |
| BUG-09 | Valid phone format | An invalid phone format must be rejected | Patient with phone `!!!not-a-phone!!!` | Fail (by design) |

## 9. Known defects and regression watch _(pre-filled from CH-001)_

These were confirmed against the live app and should be encoded as regression tests
(expected to fail until fixed, then pass once addressed).

| ID | Severity | Defect | Requirement | Regression test |
| --- | --- | --- | --- | --- |
| BUG-01 | High | Past-dated appointment accepted (`POST /appointments` date in past → 201) | REQ-028 | `tests/regression/appointments.regression.spec.ts` (red) |
| BUG-02 | High | Inactive doctor can be booked (active=false doctor → 201) | REQ-029 | `tests/regression/appointments.regression.spec.ts` (red) |
| BUG-03 | Medium | Same doctor double-booked at same date and time → 201 | REQ-036 | `tests/regression/appointments.regression.spec.ts` (red) |
| ~~BUG-04~~ | — | Reclassified: **not a defect.** The form blocks an incomplete submit via native HTML5 `required` validation (no navigation, nothing created); it just shows a native browser bubble rather than an in-app message. UX observation only. | — | `tests/ui/validation.spec.ts` (passing — documents the guard) |
| BUG-05 | Low | Only 3 appointment statuses implemented; Checked In and No Show absent | REQ-031/033 | not yet automated |
| BUG-06 | Medium | Patient search not implemented — `GET /patients` ignores `search` and returns all | REQ-047 | `tests/regression/patients.regression.spec.ts` (red) |
| BUG-07 | High | Future date of birth accepted on patient create | REQ-018 | `tests/regression/patients.regression.spec.ts` (red) |
| BUG-08 | Medium | Duplicate department name accepted (`POST /departments` → 201) | REQ-008 | `tests/regression/departments.regression.spec.ts` (red) |
| BUG-09 | Medium | Invalid phone format accepted on patient create | REQ-020 | `tests/regression/patients.regression.spec.ts` (red) |

The seven automated regression tests currently fail by design — they assert the correct
behavior, so they are red until each defect is fixed. Run with `npm run test:regression`.

Note: BUG-07 was missed during manual API probing (a missing required field returned 422
and masked the real behavior); the functional test surfaced it. Treat manual probe results
as provisional until an isolated test confirms them.

Other implemented-vs-spec gaps found while building coverage (candidates, not yet logged
as defects): `GET /appointments` has no `date` filter (REQ-048); `GET /doctors` supports
only `department_id`, not name/specialty search (REQ-015); `insurance_provider` is a
required enum, not optional free text (REQ-021).

## 10. Risks and assumptions

- The app is intentionally seeded with defects; passing means a defect is correctly
  detected, not necessarily that the app is correct. [Confirm intended behavior per defect.]
- Data model deviates from the narrative spec (single `name` field; departments have no
  `active`; appointments use `appointment_type`/`priority`/`symptoms`). Tests must target
  the implemented model.
- Shared-state isolation: `POST /test-data/reset` rebuilds the seed and **regenerates every
  document ID** on each call. Tests that fetch an ID and then act on it cannot run in
  parallel against the same database — a concurrent reset invalidates the ID mid-test.
  Mitigation: API suites run sequentially (`fullyParallel: false` on the `api` project) and
  fetch IDs at runtime rather than hard-coding them. Use sequential, not `mode: 'serial'`,
  so a failing regression test does not skip its siblings. A future option is a per-worker
  database to restore parallelism.
- [Other risks: environment stability, flaky selectors, timing.]

## 11. Schedule and responsibilities

| Activity | Owner | Target date |
| --- | --- | --- |
| Test design | [name] | [date] |
| UI automation | [name] | [date] |
| API automation | [name] | [date] |
| Execution and reporting | [name] | [date] |

## 12. Deliverables

| Deliverable | Location | Status |
| --- | --- | --- |
| This test plan | [testplan/testplan.md](testplan.md) | Current |
| Project README | [README.md](../README.md) | Current |
| Coverage map (requirement -> test) | [testplan/coverage-map.md](coverage-map.md) | Current |
| API functional tests | [tests/api/](../tests/api/) | 25 tests (section 8.2) |
| UI end-to-end tests | [tests/ui/](../tests/ui/) | 9 tests (section 8.3) |
| Regression tests (known defects) | [tests/regression/](../tests/regression/) | 7 tests (section 8.4) |
| Playwright config (projects) | [playwright.config.ts](../playwright.config.ts) | Current |
| Test scripts | [package.json](../package.json) | `test:api`, `test:ui`, `test:ci`, `test:regression` |
| CI workflow | [.github/workflows/playwright.yml](../.github/workflows/playwright.yml) | Functional gate blocking; regression watch non-blocking |
| Build-provenance setup | [tests/global-setup.ts](../tests/global-setup.ts) | Records build under test (section 6.1) |
| Execution report (HTML) | `playwright-report/index.html` | Generated per run |
| Execution report (JSON, with build metadata) | `playwright-report/results.json` | Generated per run |

The two execution reports are build artifacts (regenerated each run, not version
controlled), so they are shown as paths rather than links.
