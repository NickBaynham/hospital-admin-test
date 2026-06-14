# Living documentation — the dashboard summary.
# trace suite: tests/ui/dashboard.spec.ts. REQ-042 is a documented gap (no test yet).

@area:dashboard
Feature: Dashboard
  The landing dashboard summarizes the current state of the clinic.

  @area:dashboard @req:REQ-037 @cs:CS-037-001 @smoke
  Scenario: Show summary counts
    Given the seeded clinic data
    When the admin opens the dashboard
    Then the total counts of patients, doctors, and appointments are shown
    # verified by: tests/ui/dashboard.spec.ts "REQ-037 shows the seeded summary counts"

  @area:dashboard @req:REQ-038 @cs:CS-038-001 @smoke
  Scenario: List upcoming appointments
    Given scheduled appointments on future dates
    When the admin opens the dashboard
    Then those appointments appear under upcoming
    # verified by: tests/ui/dashboard.spec.ts "REQ-038 lists upcoming appointments"

  @area:dashboard @req:REQ-040 @cs:CS-040-001 @regression
  Scenario: The dashboard updates after a cancellation
    Given a scheduled appointment shown on the dashboard
    When the admin cancels that appointment
    Then the scheduled count decreases by one

  @area:dashboard @req:REQ-041 @cs:CS-041-001 @regression
  Scenario: A cancelled appointment is not counted as upcoming
    Given a scheduled appointment listed under upcoming
    When the admin cancels that appointment
    Then it no longer appears under upcoming
    # verified by: tests/ui/dashboard.spec.ts "REQ-040 REQ-041 reflects a cancellation"

  @area:dashboard @req:REQ-042 @cs:CS-042-001 @regression @pending
  Scenario: Show an empty state when there is no appointment data
    Given a clinic with no appointments
    When the admin opens the dashboard
    Then an empty state is shown instead of a list
    # COVERAGE GAP: no automated test yet (see coverage-map.md REQ-042).
