import { test, expect } from "../fixtures";

test.describe("SauceDemo — Authentication & Login Flows", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test("User logs in with standard credentials", async ({ loginPage, page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator(".inventory_list")).toBeVisible();
  });

  test("Locked out user displays error banner", async ({ loginPage }) => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await loginPage.assertErrorMessage("Epic sadface: Sorry, this user has been locked out.");
  });

  test("Empty credentials display validation error", async ({ loginPage }) => {
    await loginPage.login("", "");
    await loginPage.assertErrorMessage("Epic sadface: Username is required");
  });
});
