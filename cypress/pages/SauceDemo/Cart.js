export default class Cart {
  // #region Helpers on UI elements (dynamic elements)

  // Product title in cart locator
  productTitleCart(productId) {
    return cy.get(`[data-test="item-${productId}-title-link"]`);
  }

  // Remove product button in cart locator
  removeProductButtonCart(productName) {
    return cy.get(`[data-test="remove-${productName}"]`);
  }

  // #endregion

  // #region Actions on UI elements

  // Press checkout button
  pressCheckoutButton() {
    cy.get('[data-test="checkout"]').click();
    return this;
  }

  // Press product title in cart
  pressProductTitle(productId) {
    this.productTitleCart(productId).click();
    return this;
  }

  // Press remove product button in cart
  pressRemoveProductButtonCart(productName) {
    this.removeProductButtonCart(productName).click();
    return this;
  }

  // Press continue shopping button
  pressContinueShoppingButton() {
    cy.get('[data-test="continue-shopping"]').click();
    return this;
  }

  // #endregion

  // #region Validations on UI elements

  // Check product quantity by position
  validateProductQuantityInCart(position, quantity) {
    cy.get('[data-test="item-quantity"]')
      .eq(position)
      .should("have.text", quantity);
    return this;
  }

  // Check product title by product id
  validateProductTitleInBasket(productId, productTitle) {
    this.productTitleCart(productId).should("have.text", productTitle);
    return this;
  }

  // Check product price by position
  validateProductPriceInCart(position, price) {
    cy.get('[data-test="inventory-item-price"]')
      .eq(position)
      .should("have.text", price);
    return this;
  }

  // #endregion
}
