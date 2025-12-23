describe("Login into account", () => {
  // Test data - endpoint, credentials, and messages
  const endpoint = "https://practice.qabrains.com/";
  const email = "qa_testers@qabrains.com";
  const password = "Password123";
  const loginSuccessfulMsg = "Login Successful";

  // Locators for buttons
  const loginButton = ".btn-submit:contains('Login')";
  const logoutButton = ".btn-submit:contains('Logout')";

  it.skip("should log in and log out successfully", () => {
    // Step 1: Navigate to the login page
    cy.visit(endpoint); // Navigate to the main endpoint

    // Step 2: Fill in the login form with test credentials
    cy.get("input[name='email']").type(email); // Fill the email field
    cy.get("input[name='password']").type(password); // Fill the password field

    // Step 3: Click the login button
    cy.get(loginButton).click(); // Click the login button

    // Step 4: Wait for the login request to complete and check the successful login message
    cy.intercept("GET", `${endpoint}?logged=true*`).as("loginRequest"); // Wait for the request indicating successful login
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200); // Wait for the request and validate status

    // Verify the login success message
    cy.get(".success-msg .mb-3")
      .should("be.visible")
      .and("have.text", loginSuccessfulMsg); // Check if the login successful message is displayed

    // Step 5: Verify that the logout button is visible after login
    cy.get(logoutButton).should("be.visible"); // Assert that the logout button is visible after login

    // Step 6: Click the logout button to log out of the account
    cy.get(logoutButton).click(); // Click the logout button

    // Step 7: Wait for the response confirming the logout action
    cy.intercept("GET", "/?_rsc*").as("logoutRequest"); // Intercept the logout request
    cy.wait("@logoutRequest").its("response.statusCode").should("eq", 200); // Wait for the request and validate status

    // Step 8: Ensure that the login button is visible again after logout
    cy.get(loginButton).should("be.visible"); // Assert that the login button is visible after logout
  });
});
