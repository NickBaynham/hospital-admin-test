import { type Page, type Locator } from '@playwright/test';

export interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  insurance: string;
}

/** Page object for the Patients page (/patients) — list table + inline create form. */
export class PatientsPage {
  constructor(private readonly page: Page) {}

  readonly nameInput = () => this.page.getByTestId('patient-name-input');
  readonly emailInput = () => this.page.getByTestId('patient-email-input');
  readonly phoneInput = () => this.page.getByTestId('patient-phone-input');
  readonly dobInput = () => this.page.getByTestId('patient-dob-input');
  readonly insuranceSelect = () => this.page.getByTestId('insurance-provider-select');
  readonly submitButton = () => this.page.getByTestId('create-patient-submit');
  readonly errorMessage = () => this.page.getByTestId('error-message');
  readonly table = () => this.page.getByTestId('patients-table');

  genderRadio(gender: 'male' | 'female' | 'other'): Locator {
    return this.page.getByTestId(`patient-gender-${gender}`);
  }

  rows(): Locator {
    return this.table().locator('tbody tr');
  }

  editButton(patientId: string): Locator {
    return this.page.getByTestId(`edit-patient-${patientId}`);
  }

  deleteButton(patientId: string): Locator {
    return this.page.getByTestId(`delete-patient-${patientId}`);
  }

  async goto(): Promise<void> {
    await this.page.goto('/patients');
  }

  async fill(data: PatientFormData): Promise<void> {
    await this.nameInput().fill(data.name);
    await this.emailInput().fill(data.email);
    await this.phoneInput().fill(data.phone);
    await this.dobInput().fill(data.dob);
    await this.genderRadio(data.gender).check();
    await this.insuranceSelect().selectOption({ label: data.insurance });
  }

  async submit(): Promise<void> {
    await this.submitButton().click();
  }
}
