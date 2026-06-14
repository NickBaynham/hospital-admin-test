Yes. The hospital simulation requirements were roughly for a Hospital Appointment Management app designed as a realistic QA automation target.

Product Goal

Build a small but realistic hospital/clinic web app that lets users manage:

* Patients
* Doctors
* Departments
* Appointments
* Basic user roles, likely Admin and Patient

The main purpose was not to build a perfect healthcare product, but to create a testable full-stack system with UI forms, API endpoints, MongoDB data relationships, validation rules, and enough workflow complexity to support UI/API/DB automation.

⸻

Hospital Simulation Requirements

1. Tech Stack

Layer	Requirement
Frontend	React
Backend	FastAPI
Database	MongoDB
Local Runtime	Docker Compose
API Style	REST
Testing Target	Playwright UI tests, API tests, DB validation

The app should run locally with a simple command like:

docker compose up --build

⸻

2. Core Entities

User

Used for login or role simulation.

Fields:

Field	Type	Notes
id	string/ObjectId	Unique user ID
name	string	User display name
email	string	Unique
role	enum	Admin or Patient
password	string	Could be simplified for demo

Roles:

Role	Permissions
Admin	Manage patients, doctors, departments, appointments
Patient	View/create their own appointments, maybe view profile

For the first version, authentication could be simplified or mocked.

⸻

Department

Represents hospital departments like Cardiology, Pediatrics, Radiology, etc.

Fields:

Field	Type	Notes
id	string/ObjectId	Unique department ID
name	string	Required, unique
description	string	Optional
active	boolean	Whether department can be used for scheduling

Example departments:

* Cardiology
* Neurology
* Pediatrics
* Orthopedics
* General Medicine

⸻

Doctor

A doctor belongs to a department.

Fields:

Field	Type	Notes
id	string/ObjectId	Unique doctor ID
first_name	string	Required
last_name	string	Required
email	string	Required, unique
phone	string	Optional
specialty	string	Required
department_id	string/ObjectId	Required relationship to Department
active	boolean	Whether doctor is available for appointments

Relationship:

Doctor.department_id → Department.id

This gives you useful dependency testing:

* Cannot create doctor with invalid department
* Cannot schedule appointment with inactive doctor
* Doctor list can be filtered by department

⸻

Patient

Represents a hospital/clinic patient.

Fields:

Field	Type	Notes
id	string/ObjectId	Unique patient ID
first_name	string	Required
last_name	string	Required
date_of_birth	date	Required
gender	enum	Example: Male, Female, Other, Prefer not to say
email	string	Required, unique
phone	string	Required
address	string	Optional
insurance_provider	string	Optional
emergency_contact_name	string	Optional
emergency_contact_phone	string	Optional
active	boolean	Whether patient is active

Useful validation cases:

* Required first and last name
* Invalid email format
* Invalid phone format
* Date of birth cannot be in the future
* Duplicate email should be rejected

⸻

Appointment

An appointment links a patient, doctor, and department.

Fields:

Field	Type	Notes
id	string/ObjectId	Unique appointment ID
patient_id	string/ObjectId	Required
doctor_id	string/ObjectId	Required
department_id	string/ObjectId	Required
appointment_date	date	Required
appointment_time	string/time	Required
reason	string	Required or optional depending on version
status	enum	Scheduled, Checked In, Completed, Cancelled, No Show
visit_type	enum	New Patient, Follow-up, Urgent, Telehealth
notes	string	Optional

Relationships:

Appointment.patient_id → Patient.id
Appointment.doctor_id → Doctor.id
Appointment.department_id → Department.id

Important dependency rule:

The selected doctor should belong to the selected department.

So this should be invalid:

Department: Cardiology
Doctor: Dr. Smith from Pediatrics

That gives the app a nice real-world validation rule for automation testing.

⸻

3. Pages and UI Requirements

Dashboard Page

A simple landing page showing summary counts.

Display:

* Total patients
* Total doctors
* Total appointments
* Today’s appointments
* Upcoming appointments
* Recent patients

Testable elements:

* Navigation links
* Summary cards
* Table/list of upcoming appointments
* Empty state if no data exists

⸻

Patients Page

A page for listing and searching patients.

Features:

* View all patients
* Search by name or email
* Filter by active/inactive
* Click patient row to view details
* Create new patient
* Edit existing patient

Table columns:

* Name
* Date of birth
* Gender
* Email
* Phone
* Status
* Actions

⸻

Create/Edit Patient Form

This was one of the main forms for UI automation.

Fields:

Field	UI Control
First name	Text input
Last name	Text input
Date of birth	Date picker/input
Gender	Radio buttons or dropdown
Email	Text input
Phone	Text input
Address	Text area
Insurance provider	Dropdown or text input
Emergency contact name	Text input
Emergency contact phone	Text input
Active	Checkbox

Validation:

* First name required
* Last name required
* Date of birth required
* Date of birth cannot be future date
* Gender required
* Email required and valid
* Phone required
* Duplicate email rejected

⸻

Doctors Page

A page for managing doctors.

Features:

* View all doctors
* Search by name or specialty
* Filter by department
* Filter by active/inactive
* Create new doctor
* Edit doctor

Table columns:

* Name
* Specialty
* Department
* Email
* Phone
* Status
* Actions

⸻

Create/Edit Doctor Form

Fields:

Field	UI Control
First name	Text input
Last name	Text input
Email	Text input
Phone	Text input
Specialty	Text input or dropdown
Department	Dropdown
Active	Checkbox

Validation:

* First name required
* Last name required
* Email required and valid
* Specialty required
* Department required
* Cannot assign doctor to nonexistent department

⸻

Appointments Page

A page for viewing and managing appointments.

Features:

* View all appointments
* Filter by date
* Filter by department
* Filter by doctor
* Filter by status
* Create appointment
* Edit appointment
* Cancel appointment
* Mark appointment as checked in/completed

Table columns:

* Appointment date/time
* Patient
* Doctor
* Department
* Visit type
* Status
* Reason
* Actions

⸻

Create Appointment Form

This was probably the most important workflow form.

Fields:

Field	UI Control
Patient	Searchable dropdown
Department	Dropdown
Doctor	Dropdown filtered by department
Appointment date	Date input
Appointment time	Time input/dropdown
Visit type	Radio buttons or dropdown
Reason	Text area
Notes	Text area
Status	Dropdown, default Scheduled

Key behavior:

* User selects a department
* Doctor dropdown updates to only show doctors in that department
* User selects a patient
* User selects date/time
* User submits appointment
* Appointment appears in appointment list and dashboard

Validation:

* Patient required
* Department required
* Doctor required
* Appointment date required
* Appointment date cannot be in the past
* Appointment time required
* Visit type required
* Reason required, possibly optional in MVP
* Cannot book inactive doctor
* Cannot book inactive patient
* Cannot create appointment if doctor does not belong to selected department
* Optional: prevent double-booking the same doctor at same date/time

⸻

4. API Requirements

Health Check

GET /health

Returns API status.

⸻

Seed/Reset Endpoints

For testing convenience:

POST /test/reset
POST /test/seed

These are useful for Playwright/API automation because each test can start from a known state.

⸻

Department API

GET    /departments
POST   /departments
GET    /departments/{id}
PUT    /departments/{id}
DELETE /departments/{id}

⸻

Doctor API

GET    /doctors
POST   /doctors
GET    /doctors/{id}
PUT    /doctors/{id}
DELETE /doctors/{id}
GET    /doctors?department_id={department_id}

⸻

Patient API

GET    /patients
POST   /patients
GET    /patients/{id}
PUT    /patients/{id}
DELETE /patients/{id}
GET    /patients?search={query}

⸻

Appointment API

GET    /appointments
POST   /appointments
GET    /appointments/{id}
PUT    /appointments/{id}
DELETE /appointments/{id}
GET    /appointments?doctor_id={id}
GET    /appointments?patient_id={id}
GET    /appointments?department_id={id}
GET    /appointments?date={date}

⸻

5. Database Requirements

MongoDB collections:

users
departments
doctors
patients
appointments

Basic relationships would be stored using IDs:

{
  "doctor_id": "doctor_object_id",
  "patient_id": "patient_object_id",
  "department_id": "department_object_id"
}

For testing, the database should support:

* Seeded baseline data
* Reset between test runs
* Direct DB validation after UI/API workflows
* Relationship checks between appointments, doctors, patients, and departments

⸻

6. Seed Data Requirements

The app should include seeded records so automation tests have stable data.

Example Departments

General Medicine
Cardiology
Pediatrics
Orthopedics
Neurology

Example Doctors

Dr. Alice Carter - Cardiology
Dr. Ben Morgan - General Medicine
Dr. Priya Shah - Pediatrics
Dr. Elena Torres - Neurology

Example Patients

Jordan Lee
Maria Garcia
Sam Patel
Taylor Brooks

Example Appointments

* Today’s appointment
* Future appointment
* Cancelled appointment
* Completed appointment

This gives useful test coverage for filters, dashboard counts, and appointment status changes.

⸻

7. Acceptance Criteria

Patient Management

* Admin can create a patient with valid data.
* Patient appears in the patient list after creation.
* Patient details can be viewed.
* Patient can be edited.
* Invalid email shows validation error.
* Future date of birth is rejected.
* Duplicate patient email is rejected.

⸻

Doctor Management

* Admin can create a doctor assigned to a department.
* Doctor appears in the doctor list.
* Doctor can be filtered by department.
* Doctor can be marked inactive.
* Inactive doctors should not be available for new appointments.
* Doctor cannot be created without a department.

⸻

Appointment Scheduling

* Admin can schedule an appointment for an active patient with an active doctor.
* Doctor dropdown is filtered by selected department.
* Appointment appears in the appointment list after creation.
* Appointment appears on dashboard if it is upcoming or today.
* Appointment can be cancelled.
* Appointment status can be changed to Checked In, Completed, Cancelled, or No Show.
* Appointment cannot be scheduled in the past.
* Appointment cannot use a doctor outside the selected department.
* Optional: duplicate doctor time slot should be rejected.

⸻

Dashboard

* Dashboard shows correct counts for patients, doctors, appointments.
* Dashboard shows today’s appointments.
* Dashboard updates after creating or cancelling an appointment.
* Empty state displays if no appointments exist.

⸻

8. QA-Friendly Requirements

This was a big part of the point: the app should be intentionally useful as a testing target.

UI Automation Coverage

It should include:

* Navigation across multiple pages
* Text inputs
* Dropdowns
* Radio buttons
* Checkboxes
* Date/time fields
* Search/filter behavior
* Dynamic dropdown dependency: department → doctor
* Form validation
* Success/error messages
* Table assertions
* Detail page assertions

⸻

API Testing Coverage

It should support:

* CRUD testing
* Schema validation
* Negative tests
* Relationship validation
* Duplicate handling
* Filtering/query params
* Status code validation

⸻

DB Testing Coverage

It should support:

* Verify created patient exists in MongoDB
* Verify appointment links to correct patient/doctor/department
* Verify status updates persist
* Verify reset/seed works
* Verify no orphaned appointment references

⸻

9. Known Bugs / Intentional Defects

We discussed that it might be useful to include a few known or seeded defects for exploratory testing.

Possible intentional bugs:

Bug	Example
Validation bug	Future date of birth accepted
Relationship bug	Doctor from wrong department can be selected
UI bug	Success message appears even when API fails
Data bug	Cancelled appointment still counted as upcoming
Search bug	Patient search only works by first name, not last name
State bug	Doctor dropdown does not refresh after department change
Duplicate bug	Same doctor can be double-booked
Formatting bug	Phone number accepts invalid characters
API bug	DELETE patient leaves orphan appointments

These would make the app useful for a take-home-style QA exercise.

⸻

10. Suggested MVP Scope

The first version should stay small:

MVP Pages

Dashboard
Patients
Doctors
Appointments
Create Appointment

MVP Entities

Department
Doctor
Patient
Appointment

MVP Workflows

1. Create a patient.
2. Create a doctor assigned to a department.
3. Schedule an appointment.
4. Filter appointments.
5. Cancel or complete an appointment.
6. Validate dashboard updates.

That gives enough surface area for a strong Playwright portfolio project without turning into a full hospital ERP monster. Tiny fake hospital, big QA playground.