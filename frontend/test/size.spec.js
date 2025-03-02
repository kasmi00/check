import { expect, test } from '@playwright/test';

test('should show Rent by Size link', async ({ page }) => {
    await page.goto('http://localhost:5173/rent'); // Replace with the correct URL
    await expect(page.locator('text=Rent by Size')).toBeVisible();  // Check if Rent by Size link is visible
});

test('should show size options when clicked', async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
    await page.locator('text=Rent by Size').click();  // Click on Rent by Size link
    await expect(page.locator('text=Size S')).toBeVisible();  // Check if Size S option is visible
});

test('should hide size options when clicked again', async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
    await page.locator('text=Rent by Size').click();  // Open size options
    await page.locator('text=Rent by Size').click();  // Close size options
    await expect(page.locator('text=Size S')).not.toBeVisible();  // Check if Size S is no longer visible
});


test('should show multiple size options', async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
    await page.locator('text=Rent by Size').click();  // Open size options
    await expect(page.locator('text=Size S')).toBeVisible();  // Check Size S
    await expect(page.locator('text=Size M')).toBeVisible();  // Check Size M
    await expect(page.locator('text=Size L')).toBeVisible();  // Check Size L
});
