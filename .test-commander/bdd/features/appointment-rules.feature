# Living documentation — appointment validation and relationship rules.
# Scenarios tagged @defect describe rules the spec requires but the app does NOT
# currently enforce; they are covered by red-by-design regression tests.
# trace suites: tests/api/appointments.spec.ts, tests/regression/appointments.regression.spec.ts

@area:appointments
Feature: Appointment scheduling rules
  The rules that govern whether an appointment may be scheduled.

  @area:appointments @req:REQ-031 @cs:CS-031-001 @regression
  Scenario: An invalid status value is rejected
    Given a scheduled appointment
    When the admin sets its status to a value outside the allowed set
    Then the change is rejected
    # verified by: tests/api/appointments.spec.ts "REQ-031 rejects an invalid status transition value"

  @area:appointments @req:REQ-032 @cs:CS-032-001 @regression
  Scenario Outline: An invalid "<field>" value is rejected
    Given an otherwise-valid appointment request
    When the request carries an out-of-range "<field>"
    Then the appointment is rejected

    Examples:
      | field            |
      | appointment type |
      | priority         |

  @area:appointments @req:REQ-028 @cs:CS-028-001 @regression @defect
  Scenario: An appointment in the past is rejected
    Given an active patient and an active doctor
    When the admin schedules an appointment on a past date
    Then the appointment is rejected
    # KNOWN DEFECT (BUG-01): the app accepts it. Red test: tests/regression/appointments.regression.spec.ts

  @area:appointments @req:REQ-029 @cs:CS-029-001 @regression @defect
  Scenario: An inactive doctor cannot be booked
    Given a doctor marked inactive
    When the admin schedules an appointment with that doctor
    Then the appointment is rejected
    # KNOWN DEFECT (BUG-02): the app accepts it. Red test: tests/regression/appointments.regression.spec.ts

  @area:appointments @req:REQ-036 @cs:CS-036-001 @regression @defect
  Scenario: The same doctor is not double-booked
    Given a doctor already booked at a given date and time
    When the admin schedules that doctor again for the same slot
    Then the second appointment is rejected
    # KNOWN DEFECT (BUG-03): the app accepts it. Red test: tests/regression/appointments.regression.spec.ts
