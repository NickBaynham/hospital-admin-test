/**
 * Data-driven validation cases. Add a row here to add a test — no new code.
 * `expectReject: true` asserts the API rejects (status >= 400); the regression
 * cases (the app currently accepts them) live in tests/regression/.
 */

export interface PatientValidationCase {
  /** Requirement id, embedded in the test title so run-results ingestion links it. */
  req: string;
  name: string;
  /** Overrides applied to a valid patient payload. `__dupEmail` is replaced at
   *  runtime with an existing seed patient's email. */
  patch: Record<string, unknown>;
  expectReject: boolean;
}

export const patientValidationCases: PatientValidationCase[] = [
  { req: 'REQ-019', name: 'duplicate email', patch: { email: '__dupEmail' }, expectReject: true },
  { req: 'REQ-017', name: 'invalid email format', patch: { email: 'not-an-email' }, expectReject: true },
  { req: 'REQ-016', name: 'valid baseline accepted', patch: {}, expectReject: false },
];

/** Appointment enum fields and an out-of-range value each must reject. */
export const appointmentEnumCases: { field: string; badValue: string }[] = [
  { field: 'appointment_type', badValue: 'bogus-type' },
  { field: 'priority', badValue: 'bogus-priority' },
];
