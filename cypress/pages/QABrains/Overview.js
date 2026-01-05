import Helpers from './Helpers'

const helpers = new Helpers()
export default class OverviewPage {
	// #region Actions on UI elements

	pressFinishButton() {
		cy.get('button:contains("Finish")').click()
		cy.url().should('contain', '/ecommerce/checkout-complete')

		return this
	}

	// #endregion

	// #region Validations on UI elements

	validateTotalPrice(expectedPrice, currencySymbol) {
		cy.get('p.text-md')
			.last()
			.then($Price => {
				helpers.priceValidator($Price, expectedPrice, currencySymbol)
			})
		return this
	}

	// #endregion
}
