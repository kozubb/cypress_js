import { loginAs } from "../../pages/SauceDemo/Helpers/LogisAs";
import ProductListing from "../../pages/SauceDemo/ProductListing";
import Cart from "../../pages/SauceDemo/Cart";
import ProductDetails from "../../pages/SauceDemo/ProductDetails";

// Test data – endpoint, credentials, and products
const endpoint = "https://www.saucedemo.com";
const username = "standard_user";
const password = "secret_sauce";

const productBackpackName = "Sauce Labs Backpack";
const productBikeLightName = "Sauce Labs Bike Light";

const productBikeLightId = 0;
const productBackpackId = 4;

const productBackpackPrice = "$29.99";
const productBikeLightPrice = "$9.99";

describe("Add products to cart and verify cart details", () => {
  it("should add products from listing page and verify cart", () => {
    // Log in
    loginAs({ endpoint, username, password });

    // Initialize page objects
    const productListing = new ProductListing();
    const cart = new Cart();

    // Verify inventory page is loaded and cart visible
    cy.url().should("include", "/inventory.html");
    productListing.validateIfCartIsVisible();

    // Add products from listing page and validate cart count
    productListing
      .pressAddToOrderButton(productBackpackName)
      .validateShoppingCartAmount("1")
      .pressAddToOrderButton(productBikeLightName)
      .validateShoppingCartAmount("2")
      .pressShoppingCartIcon();

    // Validate products in cart
    cart
      .validateProductTitleInBasket(productBackpackId, productBackpackName)
      .validateProductQuantityInCart(0, "1")
      .validateProductPriceInCart(0, productBackpackPrice)
      .validateProductTitleInBasket(productBikeLightId, productBikeLightName)
      .validateProductQuantityInCart(1, "1")
      .validateProductPriceInCart(1, productBikeLightPrice);
  });

  it("should add products from PDP and verify cart", () => {
    // Log in
    loginAs({ endpoint, username, password });

    // Initialize page objects
    const productListing = new ProductListing();
    const cart = new Cart();
    const productDetails = new ProductDetails();

    // Verify inventory page is loaded and cart visible
    cy.url().should("include", "/inventory.html");
    productListing.validateIfCartIsVisible();

    // Add productBackpack from PDP
    productListing.pressProductImage(productBackpackName);
    cy.url().should("include", `inventory-item.html?id=${productBackpackId}`);
    productDetails
      .validateProductTitle(productBackpackName)
      .validateProductPrice(productBackpackPrice)
      .pressAddToCartButton()
      .pressBackButton();
    productListing.validateShoppingCartAmount("1");

    // Add productBikeLight from PDP
    productListing.pressProductImage(productBikeLightName);
    cy.url().should("include", `inventory-item.html?id=${productBikeLightId}`);
    productDetails
      .validateProductTitle(productBikeLightName)
      .validateProductPrice(productBikeLightPrice)
      .pressAddToCartButton();
    productListing.validateShoppingCartAmount("2");

    // Open cart and validate products
    productListing.pressShoppingCartIcon();

    cart
      .validateProductTitleInBasket(productBackpackId, productBackpackName)
      .validateProductQuantityInCart(0, "1")
      .validateProductPriceInCart(0, productBackpackPrice)
      .validateProductTitleInBasket(productBikeLightId, productBikeLightName)
      .validateProductQuantityInCart(1, "1")
      .validateProductPriceInCart(1, productBikeLightPrice);
  });
});
