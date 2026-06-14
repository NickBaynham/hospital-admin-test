# Living documentation — patient records and their validation rules.
# @defect scenarios are required by the spec but not enforced by the app (red tests).
# trace suites: tests/api/patients.spec.ts, tests/ui/validation.spec.ts,
#               tests/regression/patients.regression.spec.ts

@area:patients
Feature: Patient management
  An admin creates, views, edits, and searches patient records.

  @area:patients @req:REQ-016 @cs:CS-016-001 @smoke
  Scenario: Create a patient with valid details
    Given valid patient details
    When the admin creates the patient
    Then the patient is saved and retrievable by id
    # verified by: tests/api/patients.spec.ts "REQ-016 creates a patient and reads it back"

  @area:patients @req:REQ-024 @cs:CS-024-001 @smoke
  Scenario: Edit an existing patient
    Given an existing patient
    When the admin changes the patient's name
    Then the updated name is stored
    # verified by: tests/api/patients.spec.ts "REQ-024 updates a patient"

  @area:patients @req:REQ-019 @cs:CS-019-001 @regression
  Scenario: Reject a duplicate patient email
    Given a patient already exists with a given email
    When the admin creates another patient with that same email
    Then the creation is rejected
    # verified by: tests/api/patients.spec.ts "REQ-019 rejects a duplicate email"

  @area:patients @req:REQ-017 @cs:CS-017-001 @regression
  Scenario: Reject an invalid email format
    Given patient details with a malformed email
    When the admin creates the patient
    Then the creation is rejected
    # verified by: tests/api/patients.spec.ts "REQ-017 rejects an invalid email format"

  @area:patients @req:REQ-054 @cs:CS-054-001 @regression
  Scenario: A patient with appointments cannot be deleted
    Given a patient referenced by an appointment
    When the admin tries to delete that patient
    Then the deletion is rejected so no appointment is orphaned
    # verified by: tests/api/patients.spec.ts "REQ-054 preserves referential integrity"

  @area:patients @req:REQ-018 @cs:CS-018-001 @regression @defect
  Scenario: Reject a future date of birth
    Given patient details with a date of birth in the future
    When the admin creates the patient
    Then the creation is rejected
    # KNOWN DEFECT (BUG-07): the app accepts it. Red test: tests/regression/patients.regression.spec.ts

  @area:patients @req:REQ-020 @cs:CS-020-001 @regression @defect
  Scenario: Reject an invalid phone format
    Given patient details with a malformed phone number
    When the admin creates the patient
    Then the creation is rejected
    # KNOWN DEFECT (BUG-09): the app accepts it. Red test: tests/regression/patients.regression.spec.ts

  @area:patients @req:REQ-047 @cs:CS-047-001 @regression @defect
  Scenario: Search patients by name returns only matches
    Given several patients with distinct names
    When the admin searches by one patient's name
    Then only the matching patient is returned
    # KNOWN DEFECT (BUG-06): search is ignored. Red test: tests/regression/patients.regression.spec.ts
