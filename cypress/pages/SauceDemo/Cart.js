import Helpers from "./Helpers";
const helpers = new Helpers();

export default class Cart {
  // #region Helpers on UI elements (dynamic elements)

  // Product title in cart locator
  productTitleCart(productId) {
    cy.log(`Getting product title for productId: ${productId}`);
    return cy.get(`[data-test="item-${productId}-title-link"]`);
  }

  // Remove product button in cart locator
  removeProductButtonCart(productName) {
    cy.log(`Getting remove button for product: ${productName}`);
    return cy.get(`[data-test="remove-${productName}"]`);
  }

  // #endregion

  // #region Actions on UI elements

  // Press checkout button
  pressCheckoutButton() {
    cy.log("Pressing checkout button");
    cy.get('[data-test="checkout"]').click();
    return this;
  }

  // Press product title in cart
  pressProductTitle(productId) {
    cy.log(`Clicking on product title for productId: ${productId}`);
    this.productTitleCart(productId).click();
    return this;
  }

  // Press remove product button in cart
  pressRemoveProductButtonCart(productName) {
    cy.log(`Clicking remove button for product: ${productName}`);
    this.removeProductButtonCart(productName).click();
    return this;
  }

  // Press continue shopping button
  pressContinueShoppingButton() {
    cy.log("Pressing continue shopping button");
    cy.get('[data-test="continue-shopping"]').click();
    return this;
  }

  // #endregion

  // #region Validations on UI elements

  // Check product quantity by position
  validateProductQuantityInCart(position, quantity) {
    cy.log(
      `Validating quantity ${quantity} for product at position ${position}`
    );
    cy.get('[data-test="item-quantity"]')
      .eq(position)
      .should("have.text", quantity);
    return this;
  }

  // Check product title by product id
  validateProductTitleInBasket(productId, productTitle) {
    cy.log(
      `Validating product title "${productTitle}" for productId: ${productId}`
    );
    this.productTitleCart(productId).should("have.text", productTitle);
    return this;
  }

  // Check product price by position
  validateProductPriceInCart(position = 0, expectedPrice, currencySymbol) {
    cy.log(
      `Validating product price at position ${position}: ${currencySymbol}${expectedPrice}`
    );
    cy.get('[data-test="inventory-item-price"]')
      .eq(position)
      .then(($Price) => {
        helpers.priceValidator($Price, expectedPrice, currencySymbol);
      });
    return this;
  }

  // #endregion
}
