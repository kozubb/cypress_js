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

describe("Add products to cart different behaviour", () => {
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

  it("should not allow adding the same product twice", () => {
    // Step 1: Log in as standard user
    loginAs({ endpoint, username, password });

    // Step 2: Initialize page objects
    const productListing = new ProductListing();
    const cart = new Cart();
    const productDetails = new ProductDetails();

    // Step 3: Verify inventory page is loaded and cart is visible
    cy.url().should("include", "/inventory.html");
    productListing.validateIfCartIsVisible();

    // Step 4: Add productBackpack from PDP
    productListing.pressProductImage(productBackpackName); // Open PDP
    cy.url().should("include", `inventory-item.html?id=${productBackpackId}`);
    productDetails
      .validateProductTitle(productBackpackName) // Validate title
      .validateProductPrice(productBackpackPrice) // Validate price
      .pressAddToCartButton() // Add to cart
      .validateIfRemoveButtonIsVisible() // Validate "Remove" button
      .pressBackButton(); // Go back to listing page
    productListing.validateShoppingCartAmount("1"); // Validate cart count

    // Step 5: Verify "Add to Cart" button is disabled / cannot add again
    productListing.validateIfRemoveButtonIsVisible(productBackpackName);

    // Step 6: Add productBikeLight from PLP
    productListing
      .pressAddToOrderButton(productBikeLightName) // Add from listing
      .validateShoppingCartAmount("2") // Validate cart count
      .validateIfRemoveButtonIsVisible(productBikeLightName); // Validate "Remove" button

    // Step 7: Verify "Add to Cart" button is disabled for productBikeLight
    productListing.validateIfRemoveButtonIsVisible(productBikeLightName);
  });
});
