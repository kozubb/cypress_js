import Helpers from "../../pages/SauceDemo/Helpers";
import ProductListing from "../../pages/SauceDemo/ProductListing";
import Cart from "../../pages/SauceDemo/Cart";
import ProductDetails from "../../pages/SauceDemo/ProductDetails";
import testData from "../../fixtures/SauceDemo/TestData";

describe("Add products to cart different behaviour", () => {
  it("should add products from listing page and verify cart", () => {
    // Step 1: Initialize page objects
    const productListing = new ProductListing();
    const cart = new Cart();
    const helpers = new Helpers();

    // Step 2: Log in
    helpers.loginAs({
      endpoint: testData.Endpoint,
      username: testData.Users.StandardUser.Username,
      password: testData.Users.StandardUser.Password,
    });

    // Step 3: Verify inventory page is loaded and cart is visible
    cy.url().should("include", "/inventory.html");
    productListing.validateIfCartIsVisible();

    // Step 4: Add products from listing page and validate cart count
    productListing
      .pressAddToOrderButton(testData.Products.Backpack.Name) // Add backpack
      .validateShoppingCartAmount("1") // Validate cart count = 1
      .pressAddToOrderButton(testData.Products.BikeLight.Name) // Add bike light
      .validateShoppingCartAmount("2") // Validate cart count = 2
      .pressShoppingCartIcon(); // Open cart

    // Step 5: Validate products in cart
    cart
      .validateProductTitleInBasket(
        testData.Products.Backpack.Id,
        testData.Products.Backpack.Name
      ) // Validate backpack title
      .validateProductQuantityInCart(0, "1") // Validate backpack quantity
      .validateProductPriceInCart(
        0,
        testData.Products.Backpack.Price,
        testData.CurrencySymbol
      ) // Validate backpack price
      .validateProductTitleInBasket(
        testData.Products.BikeLight.Id,
        testData.Products.BikeLight.Name
      ) // Validate bike light title
      .validateProductQuantityInCart(1, "1") // Validate bike light quantity
      .validateProductPriceInCart(
        1,
        testData.Products.BikeLight.Price,
        testData.CurrencySymbol
      ); // Validate bike light price
  });

  it("should add products from PDP and verify cart", () => {
    // Step 1: Initialize page objects
    const productListing = new ProductListing();
    const cart = new Cart();
    const productDetails = new ProductDetails();
    const helpers = new Helpers();

    // Step 2: Log in
    helpers.loginAs({
      endpoint: testData.Endpoint,
      username: testData.Users.StandardUser.Username,
      password: testData.Users.StandardUser.Password,
    });

    // Step 3: Verify inventory page is loaded and cart is visible
    cy.url().should("include", "/inventory.html");
    productListing.validateIfCartIsVisible();

    // Step 4: Add productBackpack from PDP
    productListing.pressProductImage(testData.Products.Backpack.Name); // Open PDP
    cy.url().should(
      "include",
      `inventory-item.html?id=${testData.Products.Backpack.Id}`
    );
    productDetails
      .validateProductTitle(testData.Products.Backpack.Name) // Validate title
      .validateProductPrice(
        testData.Products.Backpack.Price,
        testData.CurrencySymbol
      ) // Validate price
      .pressAddToCartButton() // Add to cart
      .pressBackButton(); // Return to listing
    productListing.validateShoppingCartAmount("1"); // Validate cart count = 1

    // Step 5: Add productBikeLight from PDP
    productListing.pressProductImage(testData.Products.BikeLight.Name); // Open PDP
    cy.url().should(
      "include",
      `inventory-item.html?id=${testData.Products.BikeLight.Id}`
    );
    productDetails
      .validateProductTitle(testData.Products.BikeLight.Name) // Validate title
      .validateProductPrice(
        testData.Products.BikeLight.Price,
        testData.CurrencySymbol
      ) // Validate price
      .pressAddToCartButton(); // Add to cart
    productListing.validateShoppingCartAmount("2"); // Validate cart count = 2

    // Step 6: Open cart and validate products
    productListing.pressShoppingCartIcon();
    cart
      .validateProductTitleInBasket(
        testData.Products.Backpack.Id,
        testData.Products.Backpack.Name
      )
      .validateProductQuantityInCart(0, "1")
      .validateProductPriceInCart(
        0,
        testData.Products.Backpack.Price,
        testData.CurrencySymbol
      )
      .validateProductTitleInBasket(
        testData.Products.BikeLight.Id,
        testData.Products.BikeLight.Name
      )
      .validateProductQuantityInCart(1, "1")
      .validateProductPriceInCart(
        1,
        testData.Products.BikeLight.Price,
        testData.CurrencySymbol
      );
  });

  it("should not allow adding the same product twice", () => {
    // Step 1: Initialize page objects
    const productListing = new ProductListing();
    const cart = new Cart();
    const productDetails = new ProductDetails();
    const helpers = new Helpers();

    // Step 2: Log in
    helpers.loginAs({
      endpoint: testData.Endpoint,
      username: testData.Users.StandardUser.Username,
      password: testData.Users.StandardUser.Password,
    });

    // Step 3: Verify inventory page is loaded and cart is visible
    cy.url().should("include", "/inventory.html");
    productListing.validateIfCartIsVisible();

    // Step 4: Add productBackpack from PDP
    productListing.pressProductImage(testData.Products.Backpack.Name); // Open PDP
    cy.url().should(
      "include",
      `inventory-item.html?id=${testData.Products.Backpack.Id}`
    );
    productDetails
      .validateProductTitle(testData.Products.Backpack.Name) // Validate title
      .validateProductPrice(
        testData.Products.Backpack.Price,
        testData.CurrencySymbol
      ) // Validate price
      .pressAddToCartButton() // Add to cart
      .validateIfRemoveButtonIsVisible() // Validate "Remove" button is visible
      .pressBackButton(); // Return to listing page
    productListing.validateShoppingCartAmount("1"); // Validate cart count = 1

    // Step 5: Verify "Add to Cart" button is disabled / cannot add productBackpack again
    productListing.validateIfRemoveButtonIsVisible(
      testData.Products.Backpack.Name
    );

    // Step 6: Add productBikeLight from PLP
    productListing
      .pressAddToOrderButton(testData.Products.BikeLight.Name) // Add from listing
      .validateShoppingCartAmount("2") // Validate cart count = 2
      .validateIfRemoveButtonIsVisible(testData.Products.BikeLight.Name); // Validate "Remove" button

    // Step 7: Verify "Add to Cart" button is disabled for productBikeLight
    productListing.validateIfRemoveButtonIsVisible(
      testData.Products.BikeLight.Name
    );
  });
});
