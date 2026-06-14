# Living documentation — departments.
# trace suites: tests/api/departments.spec.ts, tests/regression/departments.regression.spec.ts

@area:departments
Feature: Department management
  An admin creates departments that doctors and appointments are organized under.

  @area:departments @req:REQ-007 @cs:CS-007-001 @smoke
  Scenario: Create a department with a unique name
    Given no department named "Oncology" exists
    When the admin creates a department named "Oncology"
    Then the department is added to the list
    # verified by: tests/api/departments.spec.ts "REQ-007 creates a department with a unique name"

  @area:departments @req:REQ-008 @cs:CS-008-001 @regression @defect
  Scenario: Reject a duplicate department name
    Given a department already exists with a given name
    When the admin creates another department with that same name
    Then the creation is rejected
    # KNOWN DEFECT (BUG-08): the app accepts it. Red test: tests/regression/departments.regression.spec.ts
