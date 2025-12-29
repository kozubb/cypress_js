// Page Object for Checkout Page
export default class Checkout {
  // #region Actions and Locators

  // Press "Continue" button
  pressContinueButton() {
    cy.log('Clicking "Continue" button');
    cy.get('[data-test="continue"]').click();
    return this;
  }

  // Fill checkout input by input name and expected text
  fillCheckoutInput(inputName, expectedText) {
    cy.log(`Filling input "${inputName}" with text "${expectedText}"`);
    cy.get(`[data-test="${inputName}"]`).type(expectedText);
    return this;
  }

  // #endregion

  // #region Validations

  // You can add validations here with cy.log as well

  // #endregion
}
