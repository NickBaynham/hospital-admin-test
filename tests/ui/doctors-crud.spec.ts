import { test, expect } from '../fixtures';
import { getJson } from '../api/_helpers';
import { idEquals } from '../db';
import { DoctorsPage } from '../pages/DoctorsPage';

/**
 * Doctors page CRUD through the UI: the create form happy path (with availability
 * checkboxes) and the inline edit flow.
 */
test.describe('Doctors page CRUD', () => {
  test('REQ-010 creates a doctor through the form and stores it', async ({
    page,
    request,
    seeded,
    db,
  }) => {
    const email = 'ada.lovelace.ui@example.com';
    const doctors = new DoctorsPage(page);
    await doctors.goto();
    await doctors.fill({
      name: 'Dr. Ada Lovelace',
      email,
      department: 'Cardiology',
      specialty: 'Cardiology',
      availability: ['Monday', 'Wednesday'],
    });
    await doctors.submit();

    await expect(doctors.table()).toContainText('Dr. Ada Lovelace');
    const created = (await getJson(request, '/doctors')).find((d: any) => d.email === email);
    expect(created, 'created doctor returned by API').toBeTruthy();
    const stored = await db.findById('doctors', created.id);
    expect(stored!.name).toBe('Dr. Ada Lovelace');
    const cardiology = seeded.departments.find((d) => d.name === 'Cardiology')!;
    expect(idEquals(stored!.department_id, cardiology.id), 'department_id ObjectId ref').toBeTruthy();
  });

  test('REQ-024 edits a doctor inline and persists the change', async ({ page, seeded, db }) => {
    const target = seeded.doctors[0];
    const doctors = new DoctorsPage(page);
    await doctors.goto();
    await doctors.editButton(target.id).click();
    await doctors.nameInput().fill('Dr. Sarah Chen-Reed');
    await doctors.submit();

    await expect(doctors.table()).toContainText('Dr. Sarah Chen-Reed');
    const stored = await db.findById('doctors', target.id);
    expect(stored!.name, 'edit persisted').toBe('Dr. Sarah Chen-Reed');
  });
});
