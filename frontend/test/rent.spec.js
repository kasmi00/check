import { expect, test } from '@playwright/test';



test('should show Price filter', async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
    await expect(page.locator('text=Price')).toBeVisible();  // Check if Price text is visible
});


