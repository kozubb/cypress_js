import Helpers from "../../pages/SauceDemo/Helpers";
import ProductListing from "../../pages/SauceDemo/ProductListing";
import Cart from "../../pages/SauceDemo/Cart";
import Checkout from "../../pages/SauceDemo/Checkout";
import Overview from "../../pages/SauceDemo/Overview";
import ThankYouPage from "../../pages/SauceDemo/ThankYouPage";

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
const currency = "$";
const tax = 0.08;

const firstNameText = "firstName";
const expectedFirstName = "Test First Name";
const lastNameText = "lastName";
const expectedLastName = "Test Last Name";
const zipCodeName = "postalCode";
const expectedZipCodeName = "11111";

const paymentMethod = "SauceCard #31337";
const deliveryMethod = "Free Pony Express Delivery!";
const thankYouMessage = "Thank you for your order!";

describe("Place order", () => {
  it("should place an order successfully", () => {
    // Step 1: Initialize page objects
    const helpers = new Helpers();
    const productListing = new ProductListing();
    const cart = new Cart();
    const checkout = new Checkout();
    const overview = new Overview();
    const thankYou = new ThankYouPage();

    // Step 2: Log in as standard user
    helpers.loginAs({ endpoint, username, password });

    // Step 3: Verify inventory page is loaded
    cy.url().should("include", "/inventory.html");
    productListing.validateIfCartIsVisible();

    // Step 4: Add products from listing page
    productListing
      .pressAddToOrderButton(productBackpackName)
      .validateShoppingCartAmount("1");

    productListing
      .pressAddToOrderButton(productBikeLightName)
      .validateShoppingCartAmount("2");

    // Step 5: Open cart and validate product details
    productListing.pressShoppingCartIcon();

    cart
      .validateProductTitleInBasket(productBackpackId, productBackpackName)
      .validateProductTitleInBasket(productBikeLightId, productBikeLightName)
      .validateProductQuantityInCart(0, "1")
      .validateProductQuantityInCart(1, "1")
      .validateProductPriceInCart(0, productBackpackPrice, currency)
      .validateProductPriceInCart(1, productBikeLightPrice, currency);

    // Step 6: Proceed to checkout
    cart.pressCheckoutButton();

    // Step 7: Fill checkout form
    checkout
      .fillCheckoutInput(firstNameText, expectedFirstName)
      .fillCheckoutInput(lastNameText, expectedLastName)
      .fillCheckoutInput(zipCodeName, expectedZipCodeName)
      .pressContinueButton();

    // Step 8: Validate overview page
    overview
      .validatePaymentMethod(paymentMethod)
      .validateDeliveryMethod(deliveryMethod)
      .validateSubtotal(productBackpackPrice + productBikeLightPrice, currency)
      .validateTotalPrice(
        productBackpackPrice +
          productBikeLightPrice +
          (productBackpackPrice + productBikeLightPrice) * tax,
        currency
      )
      .pressFinishButton();

    // Step 9: Validate Thank You page
    thankYou.validateThankYouText(thankYouMessage);
  });
});
