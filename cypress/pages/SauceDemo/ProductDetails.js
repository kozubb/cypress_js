import Helpers from "./Helpers";
const helpers = new Helpers();

// Page Object for Product Details Page
export default class ProductDetails {
  // #region Actions

  // Click "Add to Cart" button
  pressAddToCartButton() {
    cy.log('Clicking "Add to Cart" button');
    cy.get('[data-test="add-to-cart"]').click();
    return this;
  }

  // Click "Remove" button
  pressRemoveButton() {
    cy.log('Clicking "Remove" button');
    cy.get('[data-test="remove"]').click();
    return this;
  }

  // Click "Back to Products" button
  pressBackButton() {
    cy.log('Clicking "Back to Products" button');
    cy.get('[data-test="back-to-products"]').click();
    return this;
  }

  // #endregion

  // #region Validations

  // Validate product title text
  validateProductTitle(productName) {
    cy.log(`Validating product title: "${productName}"`);
    cy.get('[data-test="inventory-item-name"]').should(
      "have.text",
      productName
    );
    return this;
  }

  // Validate product price text
  validateProductPrice(expectedPrice, currencySymbol) {
    cy.log(`Validating product price: ${currencySymbol}${expectedPrice}`);
    cy.get('[data-test="inventory-item-price"]').then(($Price) => {
      helpers.priceValidator($Price, expectedPrice, currencySymbol);
    });
    return this;
  }

  // Validate if "Remove" button is visible after adding product to the cart
  validateIfRemoveButtonIsVisible() {
    cy.log('Validating "Remove" button is visible');
    cy.get('[data-test="remove"]').should("be.visible");
    return this;
  }

  // #endregion
}
