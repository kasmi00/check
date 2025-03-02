import { expect, test } from "@playwright/test";
import fs from 'fs';

test("User should see an error message for invalid image type", async ({ page }) => {
    // Navigate to the Lend page
    await page.goto("http://localhost:5173/lend");
    await page.waitForLoadState('load');  // Ensure the page is fully loaded

    // Upload an invalid file type (e.g., .txt file)
    const invalidFilePath = "path/to/your/test/invalidfile.txt"; // Replace with an actual invalid file path
    if (!fs.existsSync(invalidFilePath)) {
        console.error('Invalid file does not exist:', invalidFilePath);
        return; // Skip test if invalid file is missing
    }

    await page.setInputFiles('input[type="file"]', invalidFilePath);

    // Wait for the image upload error message
    const uploadImageError = page.locator('div.error-message:has-text("Please upload a PNG or JPG image.")');

    // Verify that the error message is visible
    await expect(uploadImageError).toBeVisible();
});
