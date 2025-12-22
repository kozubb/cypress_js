class ProductListing {
  shoppingCart = '[data-test="shopping-cart-link"]';

  // #region Actions on UI elements

  // #endregion

  // #region Validations on UI elements

  // Check if the shopping cart is visible on the page
  checkIfCartIsVisible() {
    cy.log("Validating if cart icon is visible");
    cy.get(this.shoppingCart).should("be.visible");
  }

  // #endregion
}

export default ProductListing;
