import { expect, test } from '@playwright/test';

test('should display welcome message', async ({ page }) => {
    await page.goto('http://localhost:5173'); // Replace with the correct URL
    await expect(page.locator('text=Welcome to Outfit On Call')).toBeVisible(); // Ensure welcome message is visible
});

test('should display fashion image', async ({ page }) => {
    await page.goto('http://localhost:5173');
    const image = page.locator('img.clothing-image');
    await expect(image).toBeVisible(); // Ensure the fashion image is visible
});

test('should display quotation text', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.locator('text="Buy Less"')).toBeVisible(); // Ensure "Buy Less" is part of the quotation
    await expect(page.locator('text="Wear More"')).toBeVisible(); // Ensure "Wear More" is part of the quotation
    await expect(page.locator('text="Start Renting"')).toBeVisible(); // Ensure "Start Renting" is part of the quotation
});

test('should display Rent Now button for logged-out users', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.locator('button.rent-button')).toBeVisible(); // Ensure Rent Now button is visible
    await expect(page.locator('button.rent-button').first()).toHaveText('Rent Now'); // Ensure the button text is "Rent Now"
});

test('should navigate to /login when Rent Now is clicked for logged-out users', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.locator('button.rent-button').click(); // Click Rent Now
    await expect(page.url()).toBe('http://localhost:5173/login'); // Ensure the URL navigates to login
});

test('should display Rent Now button for logged-in users', async ({ page }) => {
    // Simulate login by setting account context (mocking DataContext)
    await page.context().addCookies([{ name: 'account', value: 'mocked-account', path: '/' }]);
    await page.goto('http://localhost:5173');
    await expect(page.locator('button.rent-button')).toBeVisible(); // Ensure Rent Now button is visible
    await expect(page.locator('button.rent-button').first()).toHaveText('Rent Now'); // Ensure the button text is "Rent Now"
});

test('should navigate to /rent when Rent Now is clicked for logged-in users', async ({ page }) => {
    // Simulate login by setting account context (mocking DataContext)
    await page.context().addCookies([{ name: 'account', value: 'mocked-account', path: '/' }]);
    await page.goto('http://localhost:5173');
    await page.locator('button.rent-button').click(); // Click Rent Now
    await expect(page.url()).toBe('http://localhost:5173/rent'); // Ensure the URL navigates to rent
});
