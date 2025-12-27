export default class ProductListing {
  // #region Helpers on UI elements (dynamic elements)

  // Converts product name to selector format
  formatProductName(productName) {
    return productName.toLowerCase().replace(/\s+/g, "-");
  }

  // Return selector for add to order button
  addToOrderButton(productName) {
    const formattedName = this.formatProductName(productName);
    return cy.get(`[data-test="add-to-cart-${formattedName}"]`);
  }

  // Return selector for remove product button
  removeProductButton(productName) {
    const formattedName = this.formatProductName(productName);
    return cy.get(`[data-test="remove-${formattedName}"]`);
  }

  // Return selector for product image
  productImage(productName) {
    const formattedName = this.formatProductName(productName);
    return cy.get(`[data-test="inventory-item-${formattedName}-img"]`);
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
  validateIfCartIsVisible() {
    cy.get('[data-test="shopping-cart-link"]').should("be.visible");
    return this;
  }

  // Check if remove button is visible for specific product
  validateIfRemoveButtonIsVisible(productName) {
    this.removeProductButton(productName).should("be.visible");
    return this;
  }

  // Check shopping cart amount
  validateShoppingCartAmount(expectedNumber) {
    cy.get('[data-test="shopping-cart-badge"]').should(
      "have.text",
      expectedNumber
    );
    return this;
  }

  // #endregion
}
