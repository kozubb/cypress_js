export default class Overview {
  // #region Actions

  // Click finish button
  pressFinishButton() {
    cy.get('[data-test="finish"]').click();
    return this;
  }

  // #endregion

  // #region Validations

  // Validate payment method text
  validatePaymentMethod(expectedText) {
    cy.get('[data-test="payment-info-value"]').should(
      "have.text",
      expectedText
    );
    return this;
  }

  // Validate delivery method text
  validateDeliveryMethod(expectedText) {
    cy.get('[data-test="shipping-info-value"]').should(
      "have.text",
      expectedText
    );
    return this;
  }

  // Validate subtotal price (currency + numeric value)
  validateSubtotal(expectedCurrency, expectedSubtotal) {
    cy.get('[data-test="subtotal-label"]')
      .invoke("text")
      .then((text) => {
        if (!text) throw new Error("Subtotal text not found");

        const currencyMatch = text.match(/^[^\d]+/);
        const numberMatch = text.match(/[\d,.]+/);

        if (!currencyMatch)
          throw new Error(`Currency not found in subtotal "${text}"`);
        if (!numberMatch)
          throw new Error(`Numeric value not found in subtotal "${text}"`);

        expect(currencyMatch[0]).to.eq(expectedCurrency);
        expect(parseFloat(numberMatch[0].replace(",", ""))).to.be.closeTo(
          expectedSubtotal,
          0.01
        );
      });
    return this;
  }

  // Validate total equals subtotal + tax, check currency
  validateTotalFromSubtotalAndTax() {
    let subtotalValue = 0;
    let taxValue = 0;
    let totalValue = 0;
    let currency = "";

    cy.get('[data-test="subtotal-label"]')
      .invoke("text")
      .then((text) => {
        const currencyMatch = text.match(/^[^\d]+/) ?? [];
        const numberMatch = text.match(/[\d,.]+/) ?? [];
        if (!currencyMatch[0] || !numberMatch[0])
          throw new Error("Subtotal invalid");
        currency = currencyMatch[0];
        subtotalValue = parseFloat(numberMatch[0].replace(",", ""));
      });

    cy.get('[data-test="tax-label"]')
      .invoke("text")
      .then((text) => {
        const currencyMatch = text.match(/^[^\d]+/) ?? [];
        const numberMatch = text.match(/[\d,.]+/) ?? [];
        if (!currencyMatch[0] || !numberMatch[0])
          throw new Error("Tax invalid");
        expect(currencyMatch[0]).to.eq(currency);
        taxValue = parseFloat(numberMatch[0].replace(",", ""));
      });

    cy.get('[data-test="total-label"]')
      .invoke("text")
      .then((text) => {
        const currencyMatch = text.match(/^[^\d]+/) ?? [];
        const numberMatch = text.match(/[\d,.]+/) ?? [];
        if (!currencyMatch[0] || !numberMatch[0])
          throw new Error("Total invalid");
        expect(currencyMatch[0]).to.eq(currency);
        totalValue = parseFloat(numberMatch[0].replace(",", ""));
        expect(totalValue).to.be.closeTo(subtotalValue + taxValue, 0.01);
      });

    return this;
  }

  // #endregion
}
