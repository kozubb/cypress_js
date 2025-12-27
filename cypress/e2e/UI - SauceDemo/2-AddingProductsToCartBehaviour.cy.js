import { loginAs } from "../../pages/SauceDemo/Helpers/LogisAs";
import ProductListing from "../../pages/SauceDemo/ProductListing";
import Cart from "../../pages/SauceDemo/Cart";

// Test data – endpoint, credentials, and products
const endpoint = "https://www.saucedemo.com";
const username = "standard_user"; // Valid username
const password = "secret_sauce"; // Valid password

const productBackpackName = "Sauce Labs Backpack";
const productBikeLightName = "Sauce Labs Bike Light";

const productBikeLightId = 0;
const productBackpackId = 4;

const productBackpackPrice = "$9.99";
const productBikeLightPrice = "$29.99";

describe("Add products to cart and verify cart details", () => {
  it("should log in, add products, and validate cart", () => {
    // Step 1: Log in as standard user
    loginAs({ endpoint, username, password });

    // Step 2: Initialize page objects
    const productListing = new ProductListing();
    const cart = new Cart();

    // Step 3: Verify inventory page is loaded and cart icon is visible
    cy.url().should("include", "/inventory.html");
    productListing.validateIfCartIsVisible();

    // Step 4: Add products to the cart and validate counter
    productListing
      .pressAddToOrderButton(productBackpackName)
      .validateShoppingCartAmount("1");

    productListing
      .pressAddToOrderButton(productBikeLightName)
      .validateShoppingCartAmount("2");

    // Step 5: Open the cart
    productListing.pressShoppingCartIcon();

    // Step 6: Verify products in cart by title
    cart.validateProductTitleInBasket(productBackpackId, productBackpackName);
    cart.validateProductTitleInBasket(productBikeLightId, productBikeLightName);

    // Step 7: Verify quantities
    cart.validateProductQuantityInCart(0, "1");
    cart.validateProductQuantityInCart(1, "1");

    // Step 8: Verify prices
    cart.validateProductPriceInCart(0, productBikeLightPrice);
    cart.validateProductPriceInCart(1, productBackpackPrice);
  });
});
