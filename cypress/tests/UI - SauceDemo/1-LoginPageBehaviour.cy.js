import LoginPage from "../../pages/SauceDemo/Login";
import ProductListing from "../../pages/SauceDemo/ProductListing";
import HamburgerMenu from "../../pages/SauceDemo/HamburgerMenu";

describe("Login into account and logout - success", () => {
  // Test data - endpoint, credentials, and messages
  const endpoint = "https://www.saucedemo.com";
  const username = "standard_user"; // Username for login
  const password = "secret_sauce"; // Password for login

  // Step 1: Initialize page objects
  const login = new LoginPage();
  const productListing = new ProductListing();
  const hamburgerMenu = new HamburgerMenu();

  it("should log in and log out - success", () => {
    // Step 2: Navigate to the login page
    cy.visit(endpoint); // Visit the website

    // Step 3: Fill in the login form with test credentials
    login.fillInput("username", username);
    login.fillInput("password", password);

    // Step 4: Press the login button
    login.pressLoginButton();

    // Step 5: Wait for the inventory page to load and verify the cart is visible
    cy.url().should("include", "/inventory.html");
    productListing.checkIfCartIsVisible();

    // Step 6: Open the hamburger menu and log out
    hamburgerMenu.pressHamburgerMenuIcon();
    hamburgerMenu.pressHamburgerMenuLogoutBtn();

    // Step 7: Verify that the login page is shown again
    cy.url().should("eq", `${endpoint}/`);
    login.checkIfLoginButtonIsVisible();
  });
});
