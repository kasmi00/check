import { expect, test } from '@playwright/test';

test('should render signup form correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/signup'); // Your local URL

    // Check if the input fields for name, email, phone, and password are visible
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();

    // Check if the signup button is visible, specifically by text
    await expect(page.locator('button:has-text("Signup")')).toBeVisible();
});
