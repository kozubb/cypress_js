import Helpers from './Helpers'

const helpers = new Helpers()

export default class CartPage {
	// #region Actions on UI elements

	pressCheckoutButton() {
		cy.log('Pressing checkout button')
		cy.get("button:contains('Checkout')").click()
		return this
	}
	// #endregion

	// #region Validations on UI elements

	validateProductInCart(productName) {
		cy.log(`Validating product name: ${productName} in cart`)
		cy.get('.font-bold.text-lg.font-oswald').first().should('contain.text', productName)

		return this
	}

	validateProductPriceInCart(expectedPrice, currencySymbol) {
		cy.log(`Validating product price: ${expectedPrice} and currency ${currencySymbol} in cart`)
		cy.get('.font-bold.text-lg.font-oswald')
			.last()
			.then($Price => {
				helpers.priceValidator($Price, expectedPrice, currencySymbol)
			})

		return this
	}

	validateRemoveButtonVisible() {
		cy.get('button')
			.contains(/remove/i)
			.should('be.visible')
		return this
	}

	// endregion
}
