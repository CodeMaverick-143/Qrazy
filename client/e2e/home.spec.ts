import { test, expect } from "@playwright/test";

test.describe("System Integration: Home -> Navigation", () => {
  test("should load the home page and navigate to clubs", async ({ page }) => {
    await page.goto("/");
    
    const navBrand = page.locator("nav").getByText("QRAZY");
    await expect(navBrand).toBeVisible();
    
    const getPassesBtn = page.getByRole("link", { name: /Get Passes/i }).first();
    await expect(getPassesBtn).toBeVisible();
    
    await getPassesBtn.click();
    await expect(page).toHaveURL(/\/clubs/);
    
    await expect(page.locator("text=All Clubs")).toBeVisible();
  });
});
