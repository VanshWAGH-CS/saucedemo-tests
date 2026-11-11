import { test as base } from "@playwright/test";
import { SauceDemoLoginPage } from "../pages/login.page";
import { SauceDemoInventoryPage } from "../pages/inventory.page";
import { SauceDemoCartPage } from "../pages/cart.page";
import { SauceDemoCheckoutPage } from "../pages/checkout.page";

type TestPilotFixtures = {
  loginPage: SauceDemoLoginPage;
  inventoryPage: SauceDemoInventoryPage;
  cartPage: SauceDemoCartPage;
  checkoutPage: SauceDemoCheckoutPage;
};

export const test = base.extend<TestPilotFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new SauceDemoLoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new SauceDemoInventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new SauceDemoCartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new SauceDemoCheckoutPage(page));
  },
});

export { expect } from "@playwright/test";
