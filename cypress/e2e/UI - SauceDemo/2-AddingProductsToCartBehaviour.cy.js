import Helpers from "../../pages/SauceDemo/Helpers";
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

const productBackpackPrice = 29.99;
const productBikeLightPrice = 9.99;
const currencySymbol = "$";

describe("Add products to cart different behaviour", () => {
  it("should add products from listing page and verify cart", () => {
    // Step 1: Initialize page objects
    const productListing = new ProductListing();
    const cart = new Cart();
    const helpers = new Helpers();

    // Step 2: Log in
    helpers.loginAs({ endpoint, username, password });

    // Step 3: Verify inventory page is loaded and cart is visible
    cy.url().should("include", "/inventory.html");
    productListing.validateIfCartIsVisible();

    // Step 4: Add products from listing page and validate cart count
    productListing
      .pressAddToOrderButton(productBackpackName) // Add backpack
      .validateShoppingCartAmount("1") // Validate cart count = 1
      .pressAddToOrderButton(productBikeLightName) // Add bike light
      .validateShoppingCartAmount("2") // Validate cart count = 2
      .pressShoppingCartIcon(); // Open cart

    // Step 5: Validate products in cart
    cart
      .validateProductTitleInBasket(productBackpackId, productBackpackName) // Validate backpack title
      .validateProductQuantityInCart(0, "1") // Validate backpack quantity
      .validateProductPriceInCart(0, productBackpackPrice, currencySymbol) // Validate backpack price
      .validateProductTitleInBasket(productBikeLightId, productBikeLightName) // Validate bike light title
      .validateProductQuantityInCart(1, "1") // Validate bike light quantity
      .validateProductPriceInCart(1, productBikeLightPrice, currencySymbol); // Validate bike light price
  });

  it("should add products from PDP and verify cart", () => {
    // Step 1: Initialize page objects
    const productListing = new ProductListing();
    const cart = new Cart();
    const productDetails = new ProductDetails();
    const helpers = new Helpers();

    // Step 2: Log in
    helpers.loginAs({ endpoint, username, password });

    // Step 3: Verify inventory page is loaded and cart is visible
    cy.url().should("include", "/inventory.html");
    productListing.validateIfCartIsVisible();

    // Step 4: Add productBackpack from PDP
    productListing.pressProductImage(productBackpackName); // Open PDP
    cy.url().should("include", `inventory-item.html?id=${productBackpackId}`);
    productDetails
      .validateProductTitle(productBackpackName) // Validate title
      .validateProductPrice(productBackpackPrice, currencySymbol) // Validate price
      .pressAddToCartButton() // Add to cart
      .pressBackButton(); // Return to listing
    productListing.validateShoppingCartAmount("1"); // Validate cart count = 1

    // Step 5: Add productBikeLight from PDP
    productListing.pressProductImage(productBikeLightName); // Open PDP
    cy.url().should("include", `inventory-item.html?id=${productBikeLightId}`);
    productDetails
      .validateProductTitle(productBikeLightName) // Validate title
      .validateProductPrice(productBikeLightPrice, currencySymbol) // Validate price
      .pressAddToCartButton(); // Add to cart
    productListing.validateShoppingCartAmount("2"); // Validate cart count = 2

    // Step 6: Open cart and validate products
    productListing.pressShoppingCartIcon();
    cart
      .validateProductTitleInBasket(productBackpackId, productBackpackName)
      .validateProductQuantityInCart(0, "1")
      .validateProductPriceInCart(0, productBackpackPrice, currencySymbol)
      .validateProductTitleInBasket(productBikeLightId, productBikeLightName)
      .validateProductQuantityInCart(1, "1")
      .validateProductPriceInCart(1, productBikeLightPrice, currencySymbol);
  });

  it("should not allow adding the same product twice", () => {
    // Step 1: Initialize page objects
    const productListing = new ProductListing();
    const cart = new Cart();
    const productDetails = new ProductDetails();
    const helpers = new Helpers();

    // Step 2: Log in
    helpers.loginAs({ endpoint, username, password });

    // Step 3: Verify inventory page is loaded and cart is visible
    cy.url().should("include", "/inventory.html");
    productListing.validateIfCartIsVisible();

    // Step 4: Add productBackpack from PDP
    productListing.pressProductImage(productBackpackName); // Open PDP
    cy.url().should("include", `inventory-item.html?id=${productBackpackId}`);
    productDetails
      .validateProductTitle(productBackpackName) // Validate title
      .validateProductPrice(productBackpackPrice, currencySymbol) // Validate price
      .pressAddToCartButton() // Add to cart
      .validateIfRemoveButtonIsVisible() // Validate "Remove" button is visible
      .pressBackButton(); // Return to listing page
    productListing.validateShoppingCartAmount("1"); // Validate cart count = 1

    // Step 5: Verify "Add to Cart" button is disabled / cannot add productBackpack again
    productListing.validateIfRemoveButtonIsVisible(productBackpackName);

    // Step 6: Add productBikeLight from PLP
    productListing
      .pressAddToOrderButton(productBikeLightName) // Add from listing
      .validateShoppingCartAmount("2") // Validate cart count = 2
      .validateIfRemoveButtonIsVisible(productBikeLightName); // Validate "Remove" button

    // Step 7: Verify "Add to Cart" button is disabled for productBikeLight
    productListing.validateIfRemoveButtonIsVisible(productBikeLightName);
  });
});
