# BDD Feature Index

Curated, hand-written living documentation for the Hospital Appointment Management app.
These `.feature` files describe behavior in business language and trace each scenario to a
requirement (`@req:REQ-NNN`) and the automated test that verifies it (the `# verified by:`
comment on each scenario).

These are **documentation**, not a generated test suite — the executable tests live in the
repo's `tests/` (Playwright). Scenarios tagged `@defect` describe spec rules the app does
**not** currently enforce; they map to the red-by-design regression tests. `@pending` marks
a documented behavior with no automated test yet.

| Feature | Area | Scenarios | Requirements | Trace suite |
| --- | --- | --- | --- | --- |
| [appointment-scheduling](features/appointment-scheduling.feature) | appointments | 6 | REQ-025, 026, 027, 034, 035 | `tests/api/appointments.spec.ts`, `tests/ui/appointment-create.spec.ts` |
| [appointment-rules](features/appointment-rules.feature) | appointments | 5 | REQ-028†, 029†, 031, 032, 036† | `tests/api/appointments.spec.ts`, `tests/regression/appointments.regression.spec.ts` |
| [patient-management](features/patient-management.feature) | patients | 8 | REQ-016, 017, 018†, 019, 020†, 024, 047†, 054 | `tests/api/patients.spec.ts`, `tests/regression/patients.regression.spec.ts` |
| [doctor-management](features/doctor-management.feature) | doctors | 5 | REQ-010, 012, 013, 046, 054 | `tests/api/doctors.spec.ts` |
| [department-management](features/department-management.feature) | departments | 2 | REQ-007, 008† | `tests/api/departments.spec.ts`, `tests/regression/departments.regression.spec.ts` |
| [dashboard](features/dashboard.feature) | dashboard | 5 | REQ-037, 038, 040, 041, 042‡ | `tests/ui/dashboard.spec.ts` |

† `@defect` — spec rule not enforced by the app (covered by a red regression test).
‡ `@pending` — documented behavior with no automated test yet (coverage gap).

## Scope note

This is a curated subset focused on the meaningful behavioral requirements (the MVP
workflows, validation rules, relationships, and known defects). It intentionally omits
auto-generated scaffolds for infrastructure (REQ-001/002), role requirements that are out
of scope (REQ-003/004/005), and data-model deviations (REQ-009/021/022/030). See
[testplan/coverage-map.md](../../testplan/coverage-map.md) for the full requirement picture.
