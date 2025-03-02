import { expect, test } from "@playwright/test";

test("User should see an error message with invalid credentials", async ({ page }) => {
    // Navigate to the login page
    await page.goto("http://localhost:5173/login");

    // Fill in the login form with invalid credentials
    await page.fill('input[name="email"]', "wronguser@example.com");
    await page.fill('input[name="password"]', "wrongpassword");

    // Click the login button
    await page.click('button:has-text("Login")');

    // Wait for the error message to appear
    const errorMessage = page.locator('span:has-text("Something went wrong")');

    // Verify that the error message is visible
    await expect(errorMessage).toBeVisible();
});
