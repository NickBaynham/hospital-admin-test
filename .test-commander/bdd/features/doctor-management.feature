# Living documentation — doctor records and their department relationship.
# trace suites: tests/api/doctors.spec.ts, tests/ui/validation.spec.ts

@area:doctors
Feature: Doctor management
  An admin creates and manages doctors, each assigned to one department.

  @area:doctors @req:REQ-010 @cs:CS-010-001 @smoke
  Scenario: Create a doctor assigned to a department
    Given a department exists
    When the admin creates a doctor in that department
    Then the doctor is saved and retrievable by id
    # verified by: tests/api/doctors.spec.ts "REQ-010 creates a doctor and reads it back"

  @area:doctors @req:REQ-012 @cs:CS-012-001 @regression
  Scenario: Reject a doctor with a nonexistent department
    Given a department id that does not exist
    When the admin creates a doctor referencing that department
    Then the creation is rejected
    # verified by: tests/api/doctors.spec.ts "REQ-012 rejects a doctor with a nonexistent department"

  @area:doctors @req:REQ-013 @cs:CS-013-001 @regression
  Scenario: Reject a duplicate doctor email
    Given a doctor already exists with a given email
    When the admin creates another doctor with that same email
    Then the creation is rejected
    # verified by: tests/api/doctors.spec.ts "REQ-013 rejects a doctor with a duplicate email"

  @area:doctors @req:REQ-046 @cs:CS-046-001 @regression
  Scenario: Filter doctors by department
    Given doctors across several departments
    When the admin filters doctors by one department
    Then only doctors in that department are returned
    # verified by: tests/api/doctors.spec.ts "REQ-046 filters doctors by department"

  @area:doctors @req:REQ-054 @cs:CS-054-002 @regression
  Scenario: A doctor with appointments cannot be deleted
    Given a doctor referenced by an appointment
    When the admin tries to delete that doctor
    Then the deletion is rejected so no appointment is orphaned
    # verified by: tests/api/doctors.spec.ts "REQ-054 preserves referential integrity"
