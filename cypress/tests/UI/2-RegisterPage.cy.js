describe("Register account", () => {
  const endpoint = "https://practice.qabrains.com/";
  const registerSuccessfulMsg = "Registration Successful"; // Expected message on successful registration

  const registerData = {
    // User test data for register process
    name: "test name",
    country: "Poland",
    accountType: "Private Job",
    email: "test@test.com",
    password: "Test123!",
  };

  it("should register a new account", () => {
    // Intercept request for successful registration
    cy.intercept("GET", "**/registration?registered=true**").as(
      "registerRequest"
    );

    // Step 1: Navigate to the registration page
    cy.visit(`${endpoint}registration`);

    // Step 2: Fill the form
    cy.get("#name").type(registerData.name); // Type the user's name into the 'name' input field
    cy.get("#country").select(registerData.country); // Select the user's country from the dropdown
    cy.get("#account").select(registerData.accountType); // Select the user's account type from the dropdown
    cy.get("#email").type(registerData.email); // Type the user's email into the 'email' input field
    cy.get("#password").type(registerData.password); // Type the password into the 'password' input field
    cy.get("#confirm_password").type(registerData.password); // Type the same password into the 'confirm password' field to match

    // Step 3: Click signup
    cy.get(".btn-submit:contains('Signup')").click();

    // Step 4: Wait for registration response and verify status
    cy.wait("@registerRequest").its("response.statusCode").should("eq", 200);

    // Step 5: Verify success message
    cy.get(".success-msg .mb-3")
      .should("be.visible")
      .and("have.text", registerSuccessfulMsg);
  });
});
