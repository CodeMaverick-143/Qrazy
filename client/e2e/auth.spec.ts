import { test, expect } from "@playwright/test";

test.describe("E2E Bonus: Real User Login Flow", () => {
  test("should simulate a full login flow: Login -> Action -> Result", async ({ page }) => {
    await page.route("**/auth/v1/otp*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Success" }),
      });
    });

    await page.goto("/");
    const loginLink = page.getByRole("link", { name: /Log in/i });
    await loginLink.click();
    await expect(page).toHaveURL(/\/login/);

    const emailInput = page.getByPlaceholder(/USER@NETWORK.CORE/i);
    await emailInput.fill("testuser@qrazy.club");
    
    const submitBtn = page.getByRole("button", { name: /Initialize Link/i });
    await submitBtn.click();

    const successMessage = page.locator("text=Secure access link dispatched");
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveClass(/animate-pulse/);
    
    await expect(page.locator("text=Infiltrate Qrazy")).toBeVisible();
  });
});
