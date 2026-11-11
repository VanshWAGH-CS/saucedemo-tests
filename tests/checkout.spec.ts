import { test, expect } from "../fixtures";

test.describe("SauceDemo — Checkout & Order Completion Flows", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.addItemToCart("sauce-labs-backpack");
    await inventoryPage.openCart();
  });

  test("Complete checkout flow with valid customer information", async ({ cartPage, checkoutPage, page }) => {
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);

    await checkoutPage.fillInformation("Jane", "Doe", "94043");
    await expect(page).toHaveURL(/.*checkout-step-two.html/);

    await checkoutPage.finishOrder();
    await checkoutPage.assertOrderComplete();
  });

  test("Missing postal code displays required validation error", async ({ cartPage, checkoutPage }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation("Jane", "Doe", "");
    await checkoutPage.assertErrorMessage("Error: Postal Code is required");
  });

  test("Cancel checkout returns user to cart", async ({ cartPage, checkoutPage, page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.cancelButton.click();
    await expect(page).toHaveURL(/.*cart.html/);
  });
});
