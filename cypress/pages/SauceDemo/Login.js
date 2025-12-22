class LoginPage {
  loginButton = `[data-test="login-button"]`;

  // #region Actions on UI elements

  // Fill input field by input name and expected text
  fillInput(inputName, expectedText) {
    cy.log(`Filling ${inputName} input by ${expectedText}`);
    cy.get(`[data-test="${inputName}"]`).type(expectedText);
  }

  // Press login button
  pressLoginButton() {
    cy.log("Pressing login buttopn");
    cy.get(this.loginButton).click();
  }

  // #endregion

  // #region Validations on UI elements

  // Check if login button is visible on the page
  checkIfLoginButtonIsVisible() {
    cy.log("Validating that login button is visible");
    cy.get(this.loginButton).should("be.visible");
  }

  // #endregion
}

export default LoginPage;
