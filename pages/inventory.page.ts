import { type Page, type Locator, expect } from "@playwright/test";

export class SauceDemoInventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator(".inventory_list");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
    this.sortDropdown = page.locator(".product_sort_container");
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }

  async goto() {
    await this.page.goto("/inventory.html");
  }

  async addItemToCart(itemSlug: string) {
    await this.page.locator(`[data-test='add-to-cart-${itemSlug}']`).click();
  }

  async removeItemFromCart(itemSlug: string) {
    await this.page.locator(`[data-test='remove-${itemSlug}']`).click();
  }

  async selectSortOption(optionValue: string) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async assertCartBadgeCount(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }
}
