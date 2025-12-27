// Page Object for Product Listing Page
export default class ProductListing {
  // #region Actions

  // Click "Add to Cart" button
  pressAddToCartButton() {
    cy.get('[data-test="add-to-cart"]').click();
    return this;
  }

  // Click "Remove" button
  pressRemoveButton() {
    cy.get('[data-test="remove"]').click();
    return this;
  }

  // Click "Back to Products" button
  pressBackButton() {
    cy.get('[data-test="back-to-products"]').click();
    return this;
  }

  // #endregion

  // #region Validations

  // Validate product title text
  validateProductTitle(productName) {
    cy.get('[data-test="inventory-item-name"]').should(
      "have.text",
      productName
    );
    return this;
  }

  // Validate product price text
  validateProductPrice(expectedPrice) {
    cy.get('[data-test="inventory-item-price"]').should(
      "have.text",
      expectedPrice
    );
    return this;
  }

  // #endregion
}
