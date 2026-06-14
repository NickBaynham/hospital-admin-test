import { test, expect } from '../fixtures';
import { NavBar } from '../components/NavBar';

/**
 * Navigation smoke: the shared nav bar reaches every page. Data-driven over the
 * nav links; uses the NavBar component object so the nav locators live in one place.
 */
const DESTINATIONS = [
  { link: 'Patients', url: /\/patients$/, testid: 'patients-page' },
  { link: 'Doctors', url: /\/doctors$/, testid: 'doctors-page' },
  { link: 'Appointments', url: /\/appointments$/, testid: 'appointments-page' },
  { link: 'Create Appointment', url: /\/appointments\/new$/, testid: 'create-appointment-page' },
  { link: 'Dashboard', url: /\/$/, testid: 'dashboard-page' },
];

test.describe('Navigation', () => {
  for (const dest of DESTINATIONS) {
    test(`navigates to ${dest.link}`, async ({ page }) => {
      await page.goto('/');
      const nav = new NavBar(page);
      await nav.goTo(dest.link);
      await expect(page).toHaveURL(dest.url);
      await expect(page.getByTestId(dest.testid)).toBeVisible();
    });
  }
});
