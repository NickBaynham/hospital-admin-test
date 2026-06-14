import { expect, type APIRequestContext } from '@playwright/test';

/** Base URL of the FastAPI backend. Override with API_BASE_URL. */
export const API = process.env.API_BASE_URL ?? 'http://localhost:8000';

/** Restore the known seed. Note: regenerates every document ID, so callers must
 *  fetch IDs at runtime, and the suite must run on a single worker. */
export async function reset(request: APIRequestContext): Promise<void> {
  const res = await request.post(`${API}/test-data/reset`);
  expect(res.ok(), 'reset seed should succeed').toBeTruthy();
}

export async function getJson<T = any>(request: APIRequestContext, path: string): Promise<T> {
  const res = await request.get(`${API}${path}`);
  expect(res.ok(), `GET ${path} should succeed`).toBeTruthy();
  return res.json();
}

/** A valid PatientCreate body. The API requires insurance_provider (spec says optional). */
export function patientPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Test Patient',
    email: `test.patient.${Date.now()}@example.com`,
    phone: '555-987-6543',
    date_of_birth: '1990-06-15',
    gender: 'female',
    // insurance_provider is an enum: Blue Shield | Aetna | Kaiser | UnitedHealthcare | Self Pay
    insurance_provider: 'Blue Shield',
    ...overrides,
  };
}

/** A valid DoctorCreate body for the given department. */
export function doctorPayload(departmentId: string, overrides: Record<string, unknown> = {}) {
  return {
    name: 'Dr. Test Doctor',
    email: `dr.test.${Date.now()}@example.com`,
    specialty: 'General Medicine',
    department_id: departmentId,
    availability: ['Monday', 'Wednesday'],
    active: true,
    ...overrides,
  };
}

/** A valid AppointmentCreate body for a future date, given a doctor in its department. */
export function appointmentPayload(
  patientId: string,
  doctorId: string,
  departmentId: string,
  overrides: Record<string, unknown> = {},
) {
  return {
    patient_id: patientId,
    doctor_id: doctorId,
    department_id: departmentId,
    appointment_date: '2030-05-20',
    appointment_time: '11:00',
    appointment_type: 'consultation',
    priority: 'routine',
    symptoms: 'functional coverage test',
    ...overrides,
  };
}
