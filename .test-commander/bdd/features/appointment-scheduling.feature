# Living documentation — curated, hand-written (replaces the auto-generated scaffold).
# Each scenario traces to a requirement (@req) and the automated test that verifies it.
# trace suites: tests/api/appointments.spec.ts, tests/ui/appointment-create.spec.ts

@area:appointments
Feature: Appointment scheduling
  An admin schedules appointments that link a patient, a doctor, and a department.

  @area:appointments @req:REQ-025 @cs:CS-025-001 @smoke
  Scenario: Schedule an appointment for an active patient and doctor
    Given an active patient
    And an active doctor in the Cardiology department
    When the admin schedules an appointment for them on a future date
    Then the appointment is created with status "scheduled"
    # verified by: tests/api/appointments.spec.ts "REQ-025 creates a valid future appointment"

  @area:appointments @req:REQ-027 @cs:CS-027-001 @smoke
  Scenario: The doctor choices follow the selected department
    Given the create-appointment form is open
    When the admin selects a department
    Then only doctors in that department are offered
    # verified by: tests/ui/appointment-create.spec.ts "REQ-027 the doctor dropdown is filtered"

  @area:appointments @req:REQ-027 @cs:CS-027-002 @regression
  Scenario: Changing the department refreshes the doctor choices
    Given the admin has selected a department and seen its doctors
    When the admin selects a different department
    Then the offered doctors are replaced by those of the new department

  @area:appointments @req:REQ-026 @cs:CS-026-001 @regression
  Scenario: A doctor outside the selected department is rejected
    Given a doctor who does not belong to the selected department
    When the admin tries to schedule an appointment with that doctor
    Then the appointment is rejected
    # verified by: tests/api/appointments.spec.ts "REQ-026 rejects a doctor outside the selected department"

  @area:appointments @req:REQ-034 @cs:CS-034-001 @smoke
  Scenario: Cancel a scheduled appointment
    Given a scheduled appointment
    When the admin cancels it
    Then its status becomes "cancelled"
    # verified by: tests/api/appointments.spec.ts "REQ-034 transitions an appointment status to cancelled"

  @area:appointments @req:REQ-035 @cs:CS-035-001 @regression
  Scenario Outline: Filter the appointment list
    Given appointments spanning several departments, doctors, and statuses
    When the admin filters the list by "<filter>"
    Then only appointments matching that "<filter>" are shown

    Examples:
      | filter     |
      | status     |
      | department |
      | doctor     |
