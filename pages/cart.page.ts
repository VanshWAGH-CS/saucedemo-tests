import { type Page, type Locator, expect } from "@playwright/test";

export class SauceDemoCartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator("[data-test='checkout']");
    this.continueShoppingButton = page.locator("[data-test='continue-shopping']");
  }

  async goto() {
    await this.page.goto("/cart.html");
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async removeItem(itemSlug: string) {
    await this.page.locator(`[data-test='remove-${itemSlug}']`).click();
  }

  async assertItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }
}
