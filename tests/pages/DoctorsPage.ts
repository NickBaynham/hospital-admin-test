import { type Page, type Locator } from '@playwright/test';

export interface DoctorFormData {
  name: string;
  email: string;
  department: string;
  specialty: string;
  availability?: string[];
}

/** Page object for the Doctors page (/doctors) — list table + inline create form. */
export class DoctorsPage {
  constructor(private readonly page: Page) {}

  readonly nameInput = () => this.page.getByTestId('doctor-name-input');
  readonly emailInput = () => this.page.getByTestId('doctor-email-input');
  readonly departmentSelect = () => this.page.getByTestId('doctor-department-select');
  readonly specialtyInput = () => this.page.getByTestId('doctor-specialty-input');
  readonly activeCheckbox = () => this.page.getByTestId('doctor-active-checkbox');
  readonly submitButton = () => this.page.getByTestId('create-doctor-submit');
  readonly errorMessage = () => this.page.getByTestId('error-message');
  readonly table = () => this.page.getByTestId('doctors-table');

  availabilityCheckbox(day: string): Locator {
    return this.page.getByTestId(`doctor-availability-${day}`);
  }

  rows(): Locator {
    return this.table().locator('tbody tr');
  }

  editButton(doctorId: string): Locator {
    return this.page.getByTestId(`edit-doctor-${doctorId}`);
  }

  deleteButton(doctorId: string): Locator {
    return this.page.getByTestId(`delete-doctor-${doctorId}`);
  }

  async goto(): Promise<void> {
    await this.page.goto('/doctors');
  }

  async fill(data: DoctorFormData): Promise<void> {
    await this.nameInput().fill(data.name);
    await this.emailInput().fill(data.email);
    await this.departmentSelect().selectOption({ label: data.department });
    await this.specialtyInput().fill(data.specialty);
    for (const day of data.availability ?? ['Monday']) {
      await this.availabilityCheckbox(day).check();
    }
  }

  async submit(): Promise<void> {
    await this.submitButton().click();
  }
}
