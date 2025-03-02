import { expect, test } from '@playwright/test';

test('should show Rent by Price link', async ({ page }) => {
    await page.goto('http://localhost:5173/rent'); // Replace with the correct URL
    await expect(page.locator('text=Rent by Price')).toBeVisible();  // Ensure "Rent by Price" link is visible
});



test('should show price range correctly in the price filter options', async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
    await page.locator('text=Rent by Price').click(); // Click on "Rent by Price"
    const priceOption = page.locator('text=Rent under 100');
    await expect(priceOption).toBeVisible();  // Ensure a price filter is displayed correctly
});
