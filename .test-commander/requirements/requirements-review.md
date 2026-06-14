# Requirements Review

## Executive summary

- Requirements parsed: **54**
- Findings: **175** across **7** dimensions
- Open questions: **14**

Findings per dimension:

- `ambiguity`: 1
- `atomicity`: 18
- `completeness`: 9
- `consistency`: 28
- `edge-cases`: 54
- `negative-cases`: 51
- `roles-permissions`: 14

## Findings

| Requirement | Dimension | Trigger |
| --- | --- | --- |
| REQ-001 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-001 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-001 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-002 | `completeness` | body too short (9 tokens; threshold <= 10) |
| REQ-002 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-002 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-003 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-003 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-004 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-004 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-004 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-005 | `atomicity` | multiple `and`-joined clauses |
| REQ-005 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-005 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-006 | `completeness` | body too short (8 tokens; threshold <= 10) |
| REQ-006 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-006 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-007 | `consistency` | opposing modals over shared subject(s) [department] with REQ-009 |
| REQ-007 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-007 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-008 | `consistency` | opposing modals over shared subject(s) [department] with REQ-009 |
| REQ-008 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-008 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-008 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [active, department] with REQ-015 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [active] with REQ-014 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [active] with REQ-022 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [active] with REQ-023 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [department] with REQ-007 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [department] with REQ-008 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [department] with REQ-010 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [department] with REQ-011 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [department] with REQ-012 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [department] with REQ-025 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [department] with REQ-026 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [department] with REQ-027 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [department] with REQ-035 |
| REQ-009 | `consistency` | opposing modals over shared subject(s) [optional] with REQ-021 |
| REQ-009 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-009 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-010 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-010 | `consistency` | opposing modals over shared subject(s) [department] with REQ-009 |
| REQ-010 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-010 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-011 | `consistency` | opposing modals over shared subject(s) [department] with REQ-009 |
| REQ-011 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-011 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-012 | `consistency` | opposing modals over shared subject(s) [department] with REQ-009 |
| REQ-012 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-012 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-012 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-013 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-013 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-013 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-014 | `consistency` | opposing modals over shared subject(s) [active] with REQ-009 |
| REQ-014 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-014 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-015 | `atomicity` | multiple `and`-joined clauses |
| REQ-015 | `consistency` | opposing modals over shared subject(s) [active, department] with REQ-009 |
| REQ-015 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-015 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-016 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-016 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-016 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-017 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-017 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-018 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-018 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-018 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-019 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-019 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-019 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-020 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-020 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-021 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-021 | `consistency` | opposing modals over shared subject(s) [optional] with REQ-009 |
| REQ-021 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-021 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-022 | `completeness` | body too short (7 tokens; threshold <= 10) |
| REQ-022 | `consistency` | opposing modals over shared subject(s) [active] with REQ-009 |
| REQ-022 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-022 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-023 | `consistency` | opposing modals over shared subject(s) [active] with REQ-009 |
| REQ-023 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-023 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-024 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-024 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-025 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-025 | `consistency` | opposing modals over shared subject(s) [department] with REQ-009 |
| REQ-025 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-025 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-026 | `consistency` | opposing modals over shared subject(s) [department] with REQ-009 |
| REQ-026 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-026 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-026 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-027 | `consistency` | opposing modals over shared subject(s) [department] with REQ-009 |
| REQ-027 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-027 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-028 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-028 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-028 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-029 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-029 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-029 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-030 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-030 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-030 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-031 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-031 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-031 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-032 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-032 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-032 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-033 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-033 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-033 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-034 | `completeness` | body too short (9 tokens; threshold <= 10) |
| REQ-034 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-034 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-035 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-035 | `consistency` | opposing modals over shared subject(s) [department] with REQ-009 |
| REQ-035 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-035 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-036 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-036 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-036 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-037 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-037 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-037 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-038 | `completeness` | body too short (9 tokens; threshold <= 10) |
| REQ-038 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-038 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-039 | `completeness` | body too short (9 tokens; threshold <= 10) |
| REQ-039 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-039 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-040 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-040 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-041 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-041 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-042 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-042 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-043 | `completeness` | body too short (10 tokens; threshold <= 10) |
| REQ-043 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-043 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-044 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-044 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-045 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-045 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-045 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-045 | `roles-permissions` | permission verb(s) without role qualifier: delete |
| REQ-046 | `completeness` | body too short (10 tokens; threshold <= 10) |
| REQ-046 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-046 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-047 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-047 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-048 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-048 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-048 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-049 | `ambiguity` | ambiguity adjective(s): appropriate |
| REQ-049 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-049 | `roles-permissions` | permission verb(s) without role qualifier: reject |
| REQ-050 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-050 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-050 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-051 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-051 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-051 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-052 | `atomicity` | comma-list joining 3+ items with and/or |
| REQ-052 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-052 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-053 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-053 | `negative-cases` | no failure keyword (invalid/error/fail/...) |
| REQ-054 | `completeness` | body too short (9 tokens; threshold <= 10) |
| REQ-054 | `edge-cases` | no edge keyword (except/unless/otherwise/edge) |
| REQ-054 | `negative-cases` | no failure keyword (invalid/error/fail/...) |

## Per-requirement detail

### REQ-001

_Source: `requirements-structured.md`_

> The application shall run locally via `docker compose up --build`, starting the React frontend, the FastAPI backend, and the MongoDB database together.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-002

_Source: `requirements-structured.md`_

> The backend shall expose a REST API over HTTP.

**Findings:**

- `completeness` — body too short (9 tokens; threshold <= 10)
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-003

_Source: `requirements-structured.md`_

> The system shall support exactly two user roles: Admin and Patient.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-004

_Source: `requirements-structured.md`_

> An Admin shall be able to manage patients, doctors, departments, and appointments.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-005

_Source: `requirements-structured.md`_

> A Patient shall be able to view and create their own appointments and view their own profile.

**Findings:**

- `atomicity` — multiple `and`-joined clauses
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-006

_Source: `requirements-structured.md`_

> Each user shall have a unique email address.

**Findings:**

- `completeness` — body too short (8 tokens; threshold <= 10)
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-007

_Source: `requirements-structured.md`_

> An Admin shall be able to create a department with a required name.

**Findings:**

- `consistency` — opposing modals over shared subject(s) [department] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-008

_Source: `requirements-structured.md`_

> The system shall reject creating a department whose name duplicates an existing department.

**Findings:**

- `consistency` — opposing modals over shared subject(s) [department] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-009

_Source: `requirements-structured.md`_

> A department shall carry an optional description and an `active` boolean indicating whether it can be used for scheduling.

**Findings:**

- `consistency` — opposing modals over shared subject(s) [active, department] with REQ-015
- `consistency` — opposing modals over shared subject(s) [active] with REQ-014
- `consistency` — opposing modals over shared subject(s) [active] with REQ-022
- `consistency` — opposing modals over shared subject(s) [active] with REQ-023
- `consistency` — opposing modals over shared subject(s) [department] with REQ-007
- `consistency` — opposing modals over shared subject(s) [department] with REQ-008
- `consistency` — opposing modals over shared subject(s) [department] with REQ-010
- `consistency` — opposing modals over shared subject(s) [department] with REQ-011
- `consistency` — opposing modals over shared subject(s) [department] with REQ-012
- `consistency` — opposing modals over shared subject(s) [department] with REQ-025
- `consistency` — opposing modals over shared subject(s) [department] with REQ-026
- `consistency` — opposing modals over shared subject(s) [department] with REQ-027
- `consistency` — opposing modals over shared subject(s) [department] with REQ-035
- `consistency` — opposing modals over shared subject(s) [optional] with REQ-021
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-010

_Source: `requirements-structured.md`_

> An Admin shall be able to create a doctor with required first name, last name, unique email, specialty, and department.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `consistency` — opposing modals over shared subject(s) [department] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-011

_Source: `requirements-structured.md`_

> A doctor shall be assigned to exactly one existing department via `department_id`.

**Findings:**

- `consistency` — opposing modals over shared subject(s) [department] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-012

_Source: `requirements-structured.md`_

> The system shall reject creating a doctor that references a nonexistent department.

**Findings:**

- `consistency` — opposing modals over shared subject(s) [department] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-013

_Source: `requirements-structured.md`_

> The system shall reject creating a doctor whose email duplicates an existing doctor.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-014

_Source: `requirements-structured.md`_

> A doctor shall have an `active` flag, and inactive doctors shall not be selectable for new appointments.

**Findings:**

- `consistency` — opposing modals over shared subject(s) [active] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-015

_Source: `requirements-structured.md`_

> The doctor list shall be filterable by department and by active status, and searchable by name or specialty.

**Findings:**

- `atomicity` — multiple `and`-joined clauses
- `consistency` — opposing modals over shared subject(s) [active, department] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-016

_Source: `requirements-structured.md`_

> An Admin shall be able to create a patient with required first name, last name, date of birth, gender, email, and phone.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-017

_Source: `requirements-structured.md`_

> The system shall reject a patient whose email format is invalid.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-018

_Source: `requirements-structured.md`_

> The system shall reject a patient whose date of birth is a future date.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-019

_Source: `requirements-structured.md`_

> The system shall reject a patient whose email duplicates an existing patient.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-020

_Source: `requirements-structured.md`_

> The system shall reject a patient whose phone number format is invalid.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-021

_Source: `requirements-structured.md`_

> A patient shall support optional address, insurance provider, emergency contact name, and emergency contact phone.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `consistency` — opposing modals over shared subject(s) [optional] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-022

_Source: `requirements-structured.md`_

> A patient shall have an `active` flag.

**Findings:**

- `completeness` — body too short (7 tokens; threshold <= 10)
- `consistency` — opposing modals over shared subject(s) [active] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-023

_Source: `requirements-structured.md`_

> The patient list shall be searchable by name or email and filterable by active status.

**Findings:**

- `consistency` — opposing modals over shared subject(s) [active] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-024

_Source: `requirements-structured.md`_

> A patient record shall be viewable in a detail view and editable via an edit form.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-025

_Source: `requirements-structured.md`_

> An Admin shall be able to schedule an appointment that links a patient, a doctor, a department, an appointment date, and an appointment time.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `consistency` — opposing modals over shared subject(s) [department] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-026

_Source: `requirements-structured.md`_

> The selected doctor shall belong to the selected department; the system shall reject any appointment whose doctor is not in the selected department.

**Findings:**

- `consistency` — opposing modals over shared subject(s) [department] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-027

_Source: `requirements-structured.md`_

> In the create-appointment form, the doctor dropdown shall list only doctors in the currently selected department and shall refresh when the department selection changes.

**Findings:**

- `consistency` — opposing modals over shared subject(s) [department] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-028

_Source: `requirements-structured.md`_

> The system shall reject an appointment whose date is in the past.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-029

_Source: `requirements-structured.md`_

> The system shall reject an appointment that references an inactive doctor.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-030

_Source: `requirements-structured.md`_

> The system shall reject an appointment that references an inactive patient.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-031

_Source: `requirements-structured.md`_

> An appointment status shall be one of Scheduled, Checked In, Completed, Cancelled, or No Show, defaulting to Scheduled on creation.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-032

_Source: `requirements-structured.md`_

> An appointment visit type shall be one of New Patient, Follow-up, Urgent, or Telehealth.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-033

_Source: `requirements-structured.md`_

> An Admin shall be able to change an appointment status to Checked In, Completed, Cancelled, or No Show.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-034

_Source: `requirements-structured.md`_

> An Admin shall be able to cancel an appointment.

**Findings:**

- `completeness` — body too short (9 tokens; threshold <= 10)
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-035

_Source: `requirements-structured.md`_

> The appointment list shall be filterable by date, department, doctor, and status.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `consistency` — opposing modals over shared subject(s) [department] with REQ-009
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-036

_Source: `requirements-structured.md`_

> The system should reject scheduling the same doctor for two appointments at the same date and time.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-037

_Source: `requirements-structured.md`_

> The dashboard shall display total counts of patients, doctors, and appointments.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-038

_Source: `requirements-structured.md`_

> The dashboard shall display today's appointments and upcoming appointments.

**Findings:**

- `completeness` — body too short (9 tokens; threshold <= 10)
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-039

_Source: `requirements-structured.md`_

> The dashboard shall display a list of recent patients.

**Findings:**

- `completeness` — body too short (9 tokens; threshold <= 10)
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-040

_Source: `requirements-structured.md`_

> The dashboard counts and lists shall update after an appointment is created or cancelled.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-041

_Source: `requirements-structured.md`_

> A cancelled appointment shall not be counted as an upcoming appointment.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-042

_Source: `requirements-structured.md`_

> The dashboard shall display an empty state when no appointment data exists.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-043

_Source: `requirements-structured.md`_

> The API shall expose `GET /health` returning the API status.

**Findings:**

- `completeness` — body too short (10 tokens; threshold <= 10)
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-044

_Source: `requirements-structured.md`_

> The API shall expose `POST /test/reset` and `POST /test/seed` to support automated test setup.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-045

_Source: `requirements-structured.md`_

> The API shall provide create, read, update, and delete endpoints for departments, doctors, patients, and appointments.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)
- `roles-permissions` — permission verb(s) without role qualifier: delete

### REQ-046

_Source: `requirements-structured.md`_

> The doctors endpoint shall support filtering by `department_id` query parameter.

**Findings:**

- `completeness` — body too short (10 tokens; threshold <= 10)
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-047

_Source: `requirements-structured.md`_

> The patients endpoint shall support a `search` query parameter matching name or email.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-048

_Source: `requirements-structured.md`_

> The appointments endpoint shall support filtering by `doctor_id`, `patient_id`, `department_id`, and `date` query parameters.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-049

_Source: `requirements-structured.md`_

> The API shall return appropriate HTTP status codes and reject invalid payloads with a validation error response.

**Findings:**

- `ambiguity` — ambiguity adjective(s): appropriate
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `roles-permissions` — permission verb(s) without role qualifier: reject

### REQ-050

_Source: `requirements-structured.md`_

> The system shall persist data in MongoDB collections named users, departments, doctors, patients, and appointments.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-051

_Source: `requirements-structured.md`_

> Each appointment shall store `patient_id`, `doctor_id`, and `department_id` references to its related records.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-052

_Source: `requirements-structured.md`_

> `POST /test/seed` shall load baseline departments, doctors, patients, and appointments, including a today appointment, a future appointment, a cancelled appointment, and a completed appointment.

**Findings:**

- `atomicity` — comma-list joining 3+ items with and/or
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-053

_Source: `requirements-structured.md`_

> `POST /test/reset` shall return the database to a known clean state.

**Findings:**

- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

### REQ-054

_Source: `requirements-structured.md`_

> Deleting a patient shall not leave orphaned appointment references.

**Findings:**

- `completeness` — body too short (9 tokens; threshold <= 10)
- `edge-cases` — no edge keyword (except/unless/otherwise/edge)
- `negative-cases` — no failure keyword (invalid/error/fail/...)

## Open questions

- [REQ-007] REQ-007 and REQ-009 assert mutually-exclusive constraints over [department] - which is authoritative?
- [REQ-008] REQ-008 and REQ-009 assert mutually-exclusive constraints over [department] - which is authoritative?
- [REQ-009] REQ-009 and REQ-010 assert mutually-exclusive constraints over [department] - which is authoritative?
- [REQ-009] REQ-009 and REQ-011 assert mutually-exclusive constraints over [department] - which is authoritative?
- [REQ-009] REQ-009 and REQ-012 assert mutually-exclusive constraints over [department] - which is authoritative?
- [REQ-009] REQ-009 and REQ-014 assert mutually-exclusive constraints over [active] - which is authoritative?
- [REQ-009] REQ-009 and REQ-015 assert mutually-exclusive constraints over [active, department] - which is authoritative?
- [REQ-009] REQ-009 and REQ-021 assert mutually-exclusive constraints over [optional] - which is authoritative?
- [REQ-009] REQ-009 and REQ-022 assert mutually-exclusive constraints over [active] - which is authoritative?
- [REQ-009] REQ-009 and REQ-023 assert mutually-exclusive constraints over [active] - which is authoritative?
- [REQ-009] REQ-009 and REQ-025 assert mutually-exclusive constraints over [department] - which is authoritative?
- [REQ-009] REQ-009 and REQ-026 assert mutually-exclusive constraints over [department] - which is authoritative?
- [REQ-009] REQ-009 and REQ-027 assert mutually-exclusive constraints over [department] - which is authoritative?
- [REQ-009] REQ-009 and REQ-035 assert mutually-exclusive constraints over [department] - which is authoritative?

## Traceability

Parsed requirement IDs (document order):

REQ-001, REQ-002, REQ-003, REQ-004, REQ-005, REQ-006, REQ-007, REQ-008, REQ-009, REQ-010, REQ-011, REQ-012, REQ-013, REQ-014, REQ-015, REQ-016, REQ-017, REQ-018, REQ-019, REQ-020, REQ-021, REQ-022, REQ-023, REQ-024, REQ-025, REQ-026, REQ-027, REQ-028, REQ-029, REQ-030, REQ-031, REQ-032, REQ-033, REQ-034, REQ-035, REQ-036, REQ-037, REQ-038, REQ-039, REQ-040, REQ-041, REQ-042, REQ-043, REQ-044, REQ-045, REQ-046, REQ-047, REQ-048, REQ-049, REQ-050, REQ-051, REQ-052, REQ-053, REQ-054
