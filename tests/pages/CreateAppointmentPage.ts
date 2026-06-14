import { type Page, type Locator } from '@playwright/test';

export interface AppointmentFormData {
  department: string;
  doctor: string;
  patient: string;
  date: string;
  time: string;
  type: string;
  priority?: 'routine' | 'urgent' | 'emergency';
  symptoms: string;
}

/** Page object for the Create Appointment form (/appointments/new). */
export class CreateAppointmentPage {
  constructor(private readonly page: Page) {}

  readonly departmentSelect = () => this.page.getByTestId('appointment-department-select');
  readonly doctorSelect = () => this.page.getByTestId('appointment-doctor-select');
  readonly patientSelect = () => this.page.getByTestId('appointment-patient-select');
  readonly dateInput = () => this.page.getByTestId('appointment-date-input');
  readonly timeInput = () => this.page.getByTestId('appointment-time-input');
  readonly typeSelect = () => this.page.getByTestId('appointment-type-select');
  readonly symptomsInput = () => this.page.getByTestId('appointment-symptoms-textarea');
  readonly submitButton = () => this.page.getByTestId('create-appointment-submit');
  readonly errorMessage = () => this.page.getByTestId('error-message');

  priorityRadio(level: 'routine' | 'urgent' | 'emergency'): Locator {
    return this.page.getByTestId(`appointment-priority-${level}`);
  }

  doctorOptions(): Locator {
    return this.doctorSelect().locator('option');
  }

  async goto(): Promise<void> {
    await this.page.goto('/appointments/new');
  }

  async selectDepartment(label: string): Promise<void> {
    await this.departmentSelect().selectOption({ label });
  }

  /** Fill the whole form. `priority` is optional so callers can test the required guard. */
  async fill(data: AppointmentFormData): Promise<void> {
    await this.selectDepartment(data.department);
    await this.doctorSelect().selectOption({ label: data.doctor });
    await this.patientSelect().selectOption({ label: data.patient });
    await this.dateInput().fill(data.date);
    await this.timeInput().fill(data.time);
    await this.typeSelect().selectOption({ label: data.type });
    if (data.priority) await this.priorityRadio(data.priority).check();
    await this.symptomsInput().fill(data.symptoms);
  }

  async submit(): Promise<void> {
    await this.submitButton().click();
  }
}
