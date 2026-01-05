export default class ProductListingPage {
	// #region Actions on UI elements
	addProductToCartByName(productName) {
		cy.log(`Adding product to cart: ${productName}`)

		cy.contains(productName).parent().find('button').last().click()
		return this
	}

	openCart() {
		cy.log('Opening cart')

		cy.intercept('GET', `/ecommerce/cart*`).as('cart')
		cy.get('.bg-qa-clr').click()
		cy.wait('@cart').its('response.statusCode').should('eq', 200)

		return this
	}

	// #endregion

	// #region Validations on UI elements

	validateCartAmount(expectedAmount) {
		cy.log(`Validating cart amount: ${expectedAmount}`)
		cy.get('.bg-qa-clr').should('have.text', expectedAmount)
		return this
	}
	// #endregion
}
