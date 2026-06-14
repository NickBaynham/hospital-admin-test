import { type Page, type Locator } from '@playwright/test';

/** Page object for the Appointments list (/appointments) — table, filters, row actions. */
export class AppointmentsPage {
  constructor(private readonly page: Page) {}

  readonly table = () => this.page.getByTestId('appointments-table');
  readonly statusFilter = () => this.page.getByTestId('filter-status-select');
  readonly departmentFilter = () => this.page.getByTestId('filter-department-select');

  rows(): Locator {
    return this.table().locator('tbody tr');
  }

  row(appointmentId: string): Locator {
    return this.page.getByTestId(`appointment-row-${appointmentId}`);
  }

  async goto(): Promise<void> {
    await this.page.goto('/appointments');
  }

  async filterByStatus(value: string): Promise<void> {
    await this.statusFilter().selectOption(value);
  }

  async filterByDepartment(label: string): Promise<void> {
    await this.departmentFilter().selectOption({ label });
  }

  async markCompleted(appointmentId: string): Promise<void> {
    await this.page.getByTestId(`complete-appointment-${appointmentId}`).click();
  }

  async cancel(appointmentId: string): Promise<void> {
    await this.page.getByTestId(`cancel-appointment-${appointmentId}`).click();
  }

  async delete(appointmentId: string): Promise<void> {
    await this.page.getByTestId(`delete-appointment-${appointmentId}`).click();
  }
}
