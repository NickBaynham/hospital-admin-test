# Requirement → Test Coverage Map

**This is the single source of truth for coverage.** It is curated and authoritative:
its statuses encode judgment (Partial / Implicit / N/A / Out of scope) that a mechanical
signal cannot. Maps each requirement (`REQ-NNN`, see
`.test-commander/documents/uploaded/requirements-structured.md`) to the automated tests
that exercise it. Update it by reviewing `tests/` after adding or changing tests.

A machine-generated companion (`.test-commander/test-plan/coverage-map.md`, produced by
the `tc-test-plan` skill from the Playwright `results.json`) is a **disposable input**, not
a second source of truth — it is gitignored and regenerated each run. It flattens every
requirement with a linked passing test to `automated`; where it disagrees with this
curated map, **this map wins**, and the discrepancy is a prompt to refine a test tag or
reclassify here. See the run-grounded reconciliation below the table.

Status legend:

- **Automated** — covered by a passing functional test.
- **Automated (red)** — covered by a regression test that fails by design (known defect).
- **Partial** — some aspect covered; see note for what is missing.
- **Implicit** — exercised by test infrastructure (every test resets/seeds), not asserted directly.
- **N/A** — not applicable to the implemented app (a spec deviation).
- **Uncovered** — no test yet.
- **Out of scope** — excluded by test plan section 3.2.

| REQ | Summary | Status | Test(s) / note |
| --- | --- | --- | --- |
| REQ-001 | Runs via docker compose | Implicit | CI workflow starts the stack and gates on health |
| REQ-002 | REST API over HTTP | Implicit | Exercised by every API test |
| REQ-003 | Two roles Admin/Patient | Out of scope | No auth/roles in app |
| REQ-004 | Admin manages entities | Out of scope | No auth |
| REQ-005 | Patient manages own appointments | Out of scope | No auth |
| REQ-006 | Unique user email | Uncovered | No user endpoints exposed |
| REQ-007 | Create department (name) | Automated | departments: creates a department with a unique name |
| REQ-008 | Reject duplicate department name | Automated (red) | regression BUG-08 |
| REQ-009 | Department description + active | Uncovered | App has no `active` field (deviation) |
| REQ-010 | Create doctor (required fields) | Automated | doctors: creates a doctor and reads it back |
| REQ-011 | Doctor in exactly one existing dept | Automated | doctors: rejects nonexistent department |
| REQ-012 | Reject doctor with bad department | Automated | doctors: rejects nonexistent department |
| REQ-013 | Reject duplicate doctor email | Automated | doctors: rejects duplicate email |
| REQ-014 | Inactive doctor not selectable | Automated (red) | regression BUG-02 |
| REQ-015 | Doctor filter/search | Partial | doctors: filters by department (name/specialty search + active filter not implemented/untested) |
| REQ-016 | Create patient (required fields) | Automated | patients: creates a patient and reads it back |
| REQ-017 | Reject invalid email | Automated | patients: rejects an invalid email format |
| REQ-018 | Reject future date of birth | Automated (red) | regression BUG-07 |
| REQ-019 | Reject duplicate patient email | Automated | patients: rejects a duplicate email |
| REQ-020 | Reject invalid phone | Automated (red) | regression BUG-09 |
| REQ-021 | Optional patient fields | Uncovered | `insurance_provider` is a required enum (deviation) |
| REQ-022 | Patient active flag | Uncovered | App has no patient `active` field (deviation) |
| REQ-023 | Patient list search/filter | Partial | patients: lists seeded patients (search is BUG-06 red; active filter absent) |
| REQ-024 | Patient detail + edit | Automated | patients: creates+reads back, updates |
| REQ-025 | Schedule appointment | Automated | appointments: creates valid; ui: creates an appointment |
| REQ-026 | Reject doctor outside department | Automated | appointments: rejects a doctor outside the selected department |
| REQ-027 | Doctor dropdown filtered + refresh | Automated | ui: the doctor dropdown is filtered by the selected department |
| REQ-028 | Reject past appointment date | Automated (red) | regression BUG-01 |
| REQ-029 | Reject inactive doctor booking | Automated (red) | regression BUG-02 |
| REQ-030 | Reject inactive patient booking | N/A | Patients have no `active` field (deviation); concept not implemented |
| REQ-031 | Status enum, default scheduled | Automated | appointments: rejects invalid status transition value; creates valid asserts status=scheduled |
| REQ-032 | Visit type enum | Automated | appointments: rejects invalid appointment_type / priority value |
| REQ-033 | Status transitions | Partial | appointments: transitions to cancelled (Checked In/No Show absent — BUG-05) |
| REQ-034 | Cancel appointment | Automated | appointments: transitions to cancelled; ui: cancellation reflection |
| REQ-035 | Appointment list filters | Automated | appointments: filters by status/department/doctor (date filter — REQ-048 — absent) |
| REQ-036 | Reject double-booking | Automated (red) | regression BUG-03 |
| REQ-037 | Dashboard total counts | Automated | ui: shows the seeded summary counts |
| REQ-038 | Today's + upcoming appointments | Partial | ui: lists upcoming appointments (no separate "today's") |
| REQ-039 | Recent patients | Uncovered | Dashboard does not show recent patients (deviation) |
| REQ-040 | Dashboard updates on change | Automated | ui: reflects a cancellation; ui: creates an appointment |
| REQ-041 | Cancelled not counted upcoming | Automated | ui: reflects a cancellation |
| REQ-042 | Dashboard empty state | Uncovered | Gap — needs an empty-DB scenario |
| REQ-043 | GET /health | Uncovered | Used by CI wait; no dedicated assertion |
| REQ-044 | Reset/seed endpoints | Implicit | Every test calls `POST /test-data/reset` |
| REQ-045 | CRUD endpoints | Partial | patients/doctors/appointments CRUD covered; departments GET/POST covered (no id-level CRUD exposed) |
| REQ-046 | Doctors filter by department_id | Automated | doctors: filters by department |
| REQ-047 | Patients search query | Automated (red) | regression BUG-06 |
| REQ-048 | Appointments date filter | Uncovered | Not implemented (gap) |
| REQ-049 | Status codes + reject invalid payloads | Partial | API negative tests assert >=400; ui/validation surfaces server + client errors in `error-message` |
| REQ-050 | MongoDB collections | Partial | DB tests query the patients/doctors/appointments collections directly (users/departments not yet asserted) |
| REQ-051 | Appointment stores relationship refs | Automated | DB assertion: appointment create stores patient_id/doctor_id/department_id as ObjectId refs (`appointment-create.spec.ts`) |
| REQ-052 | Seed loads baseline | Implicit | Tests depend on the seed |
| REQ-053 | Reset to clean state | Implicit | Tests depend on reset |
| REQ-054 | Delete leaves no orphans | Automated | patients + doctors: referential integrity tests |

## Summary

- Automated (passing): 21 — REQ-007, 010..013, 016, 017, 019, 024, 025, 026, 027, 031, 032, 034, 035, 037, 040, 041, 046, 054
- Automated (red, known defects): 8 — REQ-008, 014, 018, 020, 028, 029, 036, 047
- Partial: 7 — REQ-015, 023, 033, 038, 045, 049, 051
- Implicit: 5 — REQ-001, 002, 044, 052, 053
- N/A: 1 — REQ-030 (no patient `active` field; concept not implemented)
- Uncovered: 9 — REQ-006, 009, 021, 022, 039, 042, 043, 048, 050
- Out of scope: 3 — REQ-003, 004, 005 (auth/roles)

## Run-grounded reconciliation

The `tc-test-plan` skill, fed the latest Playwright `results.json`, reports **25 automated
(passing), 8 automated-failing, 21 planned, 0 uncovered** across the 54 requirements. That
differs from the curated counts above, and the differences are expected, not errors:

- The skill counts any requirement with a linked **passing** test as `automated` — so it
  promotes several rows this map calls **Partial** (e.g. REQ-015, REQ-023, REQ-033, REQ-045,
  REQ-049, REQ-051) to `automated`. This map keeps them Partial because only part of the
  requirement is verified; the curated judgment is authoritative.
- The skill's `automated-failing` (8) equals this map's **Automated (red)** set
  (REQ-008/014/018/020/028/029/036/047) — the red regressions, surfaced rather than hidden.
- The skill shows **0 uncovered** only because every requirement has a test-idea seed
  linked in traceability; this map's **Uncovered** count reflects the absence of a real
  *test*, which is the meaningful signal.

When the two disagree, reconcile by either (a) refining a test's `REQ-` tag if it over-claims,
or (b) reclassifying the row here. The skill is the prompt; this map is the decision.

## Highest-value gaps (recommended order)

1. ~~UI validation / negative paths~~ — **addressed** (`tests/ui/validation.spec.ts`, plus
   regression BUG-09 for phone format).
2. ~~Appointment enum rules~~ — **addressed** (REQ-031/032). REQ-030 is N/A (no patient
   `active` field).
3. ~~Departments endpoints~~ — **addressed** for the exposed surface (REQ-007 + BUG-08);
   id-level CRUD is not implemented by the app.
4. **DB-layer assertions** — REQ-050/051 (direct MongoDB checks); no test touches Mongo yet.
5. **Dashboard empty state** — REQ-042 (needs an empty-DB scenario).
6. **Remaining unimplemented-filter gaps** — REQ-048 (appointment date filter),
   REQ-015 (doctor name/specialty search): decide whether to log as defects.
