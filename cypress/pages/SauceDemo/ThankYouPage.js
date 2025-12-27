export default class LoginPage {
  // #region Actions

  // Click "Back Home" button
  pressBackHomeButton() {
    cy.get('[data-test="back-to-products"]').click();
    return this;
  }

  // #endregion

  // #region Validations

  // Validate "Thank You" page message text
  validateThankYouText(expectedText) {
    cy.get('[data-test="complete-header"]').should("have.text", expectedText);
    return this;
  }

  // #endregion
}
