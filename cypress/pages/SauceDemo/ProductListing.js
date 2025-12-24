export default class ProductListing {
  // #region Helpers on UI elements (dynamic elements)

  // Return selector for add to order button
  addToOrderButton(productName) {
    return cy.get(`[data-test="add-to-cart-${productName}"]`);
  }

  // Return selector for remove product button
  removeProductButton(productName) {
    return cy.get(`[data-test="remove-${productName}"]`);
  }

  // Return selector for product image
  productImage(productName) {
    return cy.get(`[data-test="inventory-item-${productName}-img"]`);
  }

  // #endregion

  // #region Actions on UI elements

  // Press add to order button for specific product
  pressAddToOrderButton(productName) {
    this.addToOrderButton(productName).click();
    return this;
  }

  // Press remove product button for specific product
  pressRemoveProductButton(productName) {
    this.removeProductButton(productName).click();
    return this;
  }

  // Press product image for specific product for opening pdp
  pressProductImage(productName) {
    this.productImage(productName).click();
    return this;
  }

  // Press shopping cart icon
  pressShoppingCartIcon() {
    cy.get('[data-test="shopping-cart-link"]').click();
    return this;
  }

  // #endregion

  // #region Validations on UI elements

  // Check if shopping cart icon is visible
  checkIfCartIsVisible() {
    cy.get('[data-test="shopping-cart-link"]').should("be.visible");
    return this;
  }

  // Check if remove button is visible for specific product
  checkIfRemoveButtonIsVisible(productName) {
    this.removeProductButton(productName).should("be.visible");
    return this;
  }

  // Check shopping cart amount
  checkShoppingCartAmount(expectedNumber) {
    cy.get('[data-test="shopping-cart-badge"]').should(
      "have.text",
      expectedNumber
    );
    return this;
  }

  // #endregion
}
