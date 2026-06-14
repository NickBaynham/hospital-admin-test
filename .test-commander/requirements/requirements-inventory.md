# Requirements Inventory

Total: **54** (in document order).

| ID | Source | Body |
| --- | --- | --- |
| REQ-001 | `requirements-structured.md` | The application shall run locally via `docker compose up --build`, starting the React frontend, the FastAPI backend, ... |
| REQ-002 | `requirements-structured.md` | The backend shall expose a REST API over HTTP. |
| REQ-003 | `requirements-structured.md` | The system shall support exactly two user roles: Admin and Patient. |
| REQ-004 | `requirements-structured.md` | An Admin shall be able to manage patients, doctors, departments, and appointments. |
| REQ-005 | `requirements-structured.md` | A Patient shall be able to view and create their own appointments and view their own profile. |
| REQ-006 | `requirements-structured.md` | Each user shall have a unique email address. |
| REQ-007 | `requirements-structured.md` | An Admin shall be able to create a department with a required name. |
| REQ-008 | `requirements-structured.md` | The system shall reject creating a department whose name duplicates an existing department. |
| REQ-009 | `requirements-structured.md` | A department shall carry an optional description and an `active` boolean indicating whether it can be used for schedu... |
| REQ-010 | `requirements-structured.md` | An Admin shall be able to create a doctor with required first name, last name, unique email, specialty, and department. |
| REQ-011 | `requirements-structured.md` | A doctor shall be assigned to exactly one existing department via `department_id`. |
| REQ-012 | `requirements-structured.md` | The system shall reject creating a doctor that references a nonexistent department. |
| REQ-013 | `requirements-structured.md` | The system shall reject creating a doctor whose email duplicates an existing doctor. |
| REQ-014 | `requirements-structured.md` | A doctor shall have an `active` flag, and inactive doctors shall not be selectable for new appointments. |
| REQ-015 | `requirements-structured.md` | The doctor list shall be filterable by department and by active status, and searchable by name or specialty. |
| REQ-016 | `requirements-structured.md` | An Admin shall be able to create a patient with required first name, last name, date of birth, gender, email, and phone. |
| REQ-017 | `requirements-structured.md` | The system shall reject a patient whose email format is invalid. |
| REQ-018 | `requirements-structured.md` | The system shall reject a patient whose date of birth is a future date. |
| REQ-019 | `requirements-structured.md` | The system shall reject a patient whose email duplicates an existing patient. |
| REQ-020 | `requirements-structured.md` | The system shall reject a patient whose phone number format is invalid. |
| REQ-021 | `requirements-structured.md` | A patient shall support optional address, insurance provider, emergency contact name, and emergency contact phone. |
| REQ-022 | `requirements-structured.md` | A patient shall have an `active` flag. |
| REQ-023 | `requirements-structured.md` | The patient list shall be searchable by name or email and filterable by active status. |
| REQ-024 | `requirements-structured.md` | A patient record shall be viewable in a detail view and editable via an edit form. |
| REQ-025 | `requirements-structured.md` | An Admin shall be able to schedule an appointment that links a patient, a doctor, a department, an appointment date, ... |
| REQ-026 | `requirements-structured.md` | The selected doctor shall belong to the selected department; the system shall reject any appointment whose doctor is ... |
| REQ-027 | `requirements-structured.md` | In the create-appointment form, the doctor dropdown shall list only doctors in the currently selected department and ... |
| REQ-028 | `requirements-structured.md` | The system shall reject an appointment whose date is in the past. |
| REQ-029 | `requirements-structured.md` | The system shall reject an appointment that references an inactive doctor. |
| REQ-030 | `requirements-structured.md` | The system shall reject an appointment that references an inactive patient. |
| REQ-031 | `requirements-structured.md` | An appointment status shall be one of Scheduled, Checked In, Completed, Cancelled, or No Show, defaulting to Schedule... |
| REQ-032 | `requirements-structured.md` | An appointment visit type shall be one of New Patient, Follow-up, Urgent, or Telehealth. |
| REQ-033 | `requirements-structured.md` | An Admin shall be able to change an appointment status to Checked In, Completed, Cancelled, or No Show. |
| REQ-034 | `requirements-structured.md` | An Admin shall be able to cancel an appointment. |
| REQ-035 | `requirements-structured.md` | The appointment list shall be filterable by date, department, doctor, and status. |
| REQ-036 | `requirements-structured.md` | The system should reject scheduling the same doctor for two appointments at the same date and time. |
| REQ-037 | `requirements-structured.md` | The dashboard shall display total counts of patients, doctors, and appointments. |
| REQ-038 | `requirements-structured.md` | The dashboard shall display today's appointments and upcoming appointments. |
| REQ-039 | `requirements-structured.md` | The dashboard shall display a list of recent patients. |
| REQ-040 | `requirements-structured.md` | The dashboard counts and lists shall update after an appointment is created or cancelled. |
| REQ-041 | `requirements-structured.md` | A cancelled appointment shall not be counted as an upcoming appointment. |
| REQ-042 | `requirements-structured.md` | The dashboard shall display an empty state when no appointment data exists. |
| REQ-043 | `requirements-structured.md` | The API shall expose `GET /health` returning the API status. |
| REQ-044 | `requirements-structured.md` | The API shall expose `POST /test/reset` and `POST /test/seed` to support automated test setup. |
| REQ-045 | `requirements-structured.md` | The API shall provide create, read, update, and delete endpoints for departments, doctors, patients, and appointments. |
| REQ-046 | `requirements-structured.md` | The doctors endpoint shall support filtering by `department_id` query parameter. |
| REQ-047 | `requirements-structured.md` | The patients endpoint shall support a `search` query parameter matching name or email. |
| REQ-048 | `requirements-structured.md` | The appointments endpoint shall support filtering by `doctor_id`, `patient_id`, `department_id`, and `date` query par... |
| REQ-049 | `requirements-structured.md` | The API shall return appropriate HTTP status codes and reject invalid payloads with a validation error response. |
| REQ-050 | `requirements-structured.md` | The system shall persist data in MongoDB collections named users, departments, doctors, patients, and appointments. |
| REQ-051 | `requirements-structured.md` | Each appointment shall store `patient_id`, `doctor_id`, and `department_id` references to its related records. |
| REQ-052 | `requirements-structured.md` | `POST /test/seed` shall load baseline departments, doctors, patients, and appointments, including a today appointment... |
| REQ-053 | `requirements-structured.md` | `POST /test/reset` shall return the database to a known clean state. |
| REQ-054 | `requirements-structured.md` | Deleting a patient shall not leave orphaned appointment references. |
