import { test, expect } from "../fixtures";

test.describe("SauceDemo — Product Catalog & Cart Operations", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Add backpack to shopping cart and verify badge count", async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart("sauce-labs-backpack");
    await inventoryPage.assertCartBadgeCount("1");
  });

  test("Sort products by price low to high", async ({ inventoryPage, page }) => {
    await inventoryPage.selectSortOption("lohi");
    const firstPrice = page.locator(".inventory_item_price").first();
    await expect(firstPrice).toHaveText("$7.99");
  });

  test("Add multiple items and remove one from inventory", async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart("sauce-labs-backpack");
    await inventoryPage.addItemToCart("sauce-labs-bike-light");
    await inventoryPage.assertCartBadgeCount("2");

    await inventoryPage.removeItemFromCart("sauce-labs-backpack");
    await inventoryPage.assertCartBadgeCount("1");
  });

  test("Logout through sidebar menu navigation", async ({ inventoryPage, page }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await expect(page.locator("[data-test='login-button']")).toBeVisible();
  });
});
