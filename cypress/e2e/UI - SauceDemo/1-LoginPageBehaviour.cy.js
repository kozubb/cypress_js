import LoginPage from "../../pages/SauceDemo/Login";
import ProductListing from "../../pages/SauceDemo/ProductListing";
import HamburgerMenu from "../../pages/SauceDemo/HamburgerMenu";

describe("Login into account and logout - success", () => {
  // Test data - endpoint, credentials, and messages
  const endpoint = "https://www.saucedemo.com";
  const username = "standard_user"; // Username for login
  const lockedUsername = "locked_out_user"; // Locked-out username
  const password = "secret_sauce"; // Password for login
  const wrongPassword = "test_password"; // Incorrect password
  const wrongDataMessage =
    "Username and password do not match any user in this service";
  const lockedUserMessage = "Sorry, this user has been locked out.";

  // Step 1: Initialize page objects
  const login = new LoginPage();
  const productListing = new ProductListing();
  const hamburgerMenu = new HamburgerMenu();

  it("should log in and log out - success", () => {
    // Step 2: Navigate to the login page
    cy.visit(endpoint);

    // Step 3: Fill in the login form with valid credentials
    login.fillInput("username", username);
    login.fillInput("password", password);

    // Step 4: Press the login button
    login.pressLoginButton();

    // Step 5: Verify successful login
    cy.url().should("include", "/inventory.html");
    productListing.validateIfCartIsVisible();

    // Step 6: Open hamburger menu and log out
    hamburgerMenu.pressHamburgerMenuIcon();
    hamburgerMenu.pressHamburgerMenuLogoutBtn();

    // Step 7: Verify return to login page
    cy.url().should("eq", `${endpoint}/`);
    login.validateIfLoginButtonIsVisible();
  });

  it("login - wrong password", () => {
    // Step 2: Navigate to the login page
    cy.visit(endpoint);

    // Step 3: Fill in the login form with username and wrong password
    login.fillInput("username", username);
    login.fillInput("password", wrongPassword);

    // Step 4: Press the login button
    login.pressLoginButton();

    // Step 5: Verify error message for wrong credentials
    login.validateLoginErrorMessage(wrongDataMessage);
  });

  it("login - user is locked", () => {
    // Step 2: Navigate to the login page
    cy.visit(endpoint);

    // Step 3: Fill in the login form with locked-out username
    login.fillInput("username", lockedUsername);
    login.fillInput("password", password);

    // Step 4: Press the login button
    login.pressLoginButton();

    // Step 5: Verify error message for locked user
    login.validateLoginErrorMessage(lockedUserMessage);
  });
});
