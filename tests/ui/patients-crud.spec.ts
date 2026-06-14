import { test, expect } from '../fixtures';
import { getJson } from '../api/_helpers';
import { PatientsPage } from '../pages/PatientsPage';

/**
 * Patients page CRUD through the UI: the create form happy path, the inline edit
 * flow, and row delete — the interactive surface verified only at the API before.
 */
test.describe('Patients page CRUD', () => {
  test('REQ-016 creates a patient through the form and stores it', async ({
    page,
    request,
    db,
  }) => {
    const email = 'grace.hopper.ui@example.com';
    const patients = new PatientsPage(page);
    await patients.goto();
    await patients.fill({
      name: 'Grace Hopper',
      email,
      phone: '555-222-3344',
      dob: '1986-12-09',
      gender: 'female',
      insurance: 'Aetna',
    });
    await patients.submit();

    await expect(patients.table()).toContainText('Grace Hopper');
    const created = (await getJson(request, '/patients')).find((p: any) => p.email === email);
    expect(created, 'created patient returned by API').toBeTruthy();
    const stored = await db.findById('patients', created.id);
    expect(stored!.name).toBe('Grace Hopper');
  });

  test('REQ-024 edits a patient inline and persists the change', async ({ page, seeded, db }) => {
    const target = seeded.patients[0];
    const patients = new PatientsPage(page);
    await patients.goto();
    await patients.editButton(target.id).click();
    await patients.nameInput().fill('Johnny Smith');
    await patients.submit();

    await expect(patients.table()).toContainText('Johnny Smith');
    const stored = await db.findById('patients', target.id);
    expect(stored!.name, 'edit persisted').toBe('Johnny Smith');
  });

  test('REQ-045 deletes a patient with no appointments from the list', async ({
    page,
    request,
    seeded,
    db,
  }) => {
    // A patient with no appointments (the seeded three all have one).
    const created = await (
      await request.post(`${seeded.api}/patients`, {
        data: {
          name: 'Temp Patient',
          email: 'temp.patient.ui@example.com',
          phone: '555-000-1111',
          date_of_birth: '1995-01-01',
          gender: 'other',
          insurance_provider: 'Kaiser',
        },
      })
    ).json();

    const patients = new PatientsPage(page);
    await patients.goto();
    await patients.deleteButton(created.id).click();

    await expect(patients.deleteButton(created.id)).toHaveCount(0);
    expect(await db.findById('patients', created.id), 'deleted from store').toBeNull();
  });
});
