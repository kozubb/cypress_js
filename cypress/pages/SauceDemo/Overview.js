import Helpers from "./Helpers";
const helpers = new Helpers();

export default class Overview {
  // #region Actions

  // Click finish button
  pressFinishButton() {
    cy.log("Clicking 'Finish' button");
    cy.get('[data-test="finish"]').click();
    return this;
  }

  // #endregion

  // #region Validations

  // Validate payment method text
  validatePaymentMethod(expectedText) {
    cy.log(`Validating payment method text: "${expectedText}"`);
    cy.get('[data-test="payment-info-value"]').should(
      "have.text",
      expectedText
    );
    return this;
  }

  // Validate delivery method text
  validateDeliveryMethod(expectedText) {
    cy.log(`Validating delivery method text: "${expectedText}"`);
    cy.get('[data-test="shipping-info-value"]').should(
      "have.text",
      expectedText
    );
    return this;
  }

  // Validate subtotal price (currency + numeric value)
  validateSubtotal(expectedPrice, currency) {
    cy.log(`Validating subtotal: ${currency}${expectedPrice}`);
    cy.get('[data-test="subtotal-label"]').then(($Price) => {
      helpers.priceValidator($Price, expectedPrice, currency);
    });
    return this;
  }

  // Validate total price, check currency
  validateTotalPrice(expectedPrice, currencySymbol) {
    cy.log(`Validating total price: ${currencySymbol}${expectedPrice}`);
    cy.get('[data-test="total-label"]').then(($Price) => {
      helpers.priceValidator($Price, expectedPrice, currencySymbol);
    });
    return this;
  }

  // #endregion
}
