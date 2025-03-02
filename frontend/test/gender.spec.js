import { expect, test } from '@playwright/test';

test('should show All gender radio button', async ({ page }) => {
    await page.goto('http://localhost:5173/rent'); // Replace with the correct URL
    await expect(page.locator('label[for="flexRadioDefaultAll"]')).toBeVisible();  // Check if "All" gender radio button is visible
});

test('should show Male gender radio button', async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
    await expect(page.locator('label[for="flexRadioDefaultMale"]')).toBeVisible();  // Check if "Male" gender radio button is visible
});

test('should show Female gender radio button', async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
    await expect(page.locator('label[for="flexRadioDefaultFemale"]')).toBeVisible();  // Check if "Female" gender radio button is visible
});

test('should navigate to /rent when "All" gender is selected', async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
    await page.locator('#flexRadioDefaultAll').click();  // Click on "All" gender radio button
    await expect(page.url()).toBe('http://localhost:5173/rent');  // Check if the URL is /rent
});

test('should navigate to /rent?gender=male when "Male" gender is selected', async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
    await page.locator('#flexRadioDefaultMale').click();  // Click on "Male" gender radio button
    await expect(page.url()).toBe('http://localhost:5173/rent?gender=male');  // Check if the URL is /rent?gender=male
});

test('should navigate to /rent?gender=female when "Female" gender is selected', async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
    await page.locator('#flexRadioDefaultFemale').click();  // Click on "Female" gender radio button
    await expect(page.url()).toBe('http://localhost:5173/rent?gender=female');  // Check if the URL is /rent?gender=female
});
