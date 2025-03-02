import { expect, test } from '@playwright/test';

test('should show Rent by Category link', async ({ page }) => {
    await page.goto('http://localhost:5173/rent'); // Replace with the correct URL
    await expect(page.locator('text=Rent by Category')).toBeVisible();  // Check if Rent by Category link is visible
});



test('should hide category options when clicked again', async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
    await page.locator('text=Rent by Category').click();  // Open category options
    await page.locator('text=Rent by Category').click();  // Close category options
    await expect(page.locator('text=Clothing')).not.toBeVisible();  // Check if "Clothing" category is no longer visible
});




