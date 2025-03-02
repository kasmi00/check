// navbar.spec.js
import { expect, test } from '@playwright/test';

test('should load navbar and click Home link', async ({ page }) => {
    // Go to the local development server
    await page.goto('http://localhost:5173');

    // Check if the "Home" link is visible and clickable
    const homeLink = page.locator('a[href="/"]');
    await expect(homeLink).toBeVisible();
    await homeLink.click();

    // Check if we are on the Home page
    await expect(page).toHaveURL('http://localhost:5173/');
});


