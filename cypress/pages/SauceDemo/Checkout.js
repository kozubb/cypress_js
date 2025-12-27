// Page Object for Checkout Page
export default class Checkout {
  // #region Actions and Locators

  // Press "Continue" button
  pressContinueButton() {
    cy.get('[data-test="continue"]').click();
    return this;
  }

  // Fill checkout input by input name and expected text
  fillCheckoutInput(inputName, expectedText) {
    cy.findByRole("textbox", { name: inputName }).type(expectedText);
    return this;
  }

  // #endregion

  // #region Validations

  // #endregion
}
