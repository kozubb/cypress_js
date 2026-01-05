import testData from '../../fixtures/QABrains/TestData'
export default class CheckoutPage {
	// #region Actions on UI elements
	pressContinueButton() {
		cy.get('button:contains("Continue")').click()
		cy.url().should('contain', 'ecommerce/checkout-info')

		return this
	}

	// #endregion

	// #region Validations on UI elements

	validateEmailIsDisabled() {
		cy.contains('.form-label', 'Email').siblings().should('be.disabled')
		return this
	}

	fillInput(inputName, expectedData) {
		cy.contains('.form-label', inputName).siblings().type(expectedData)
		return this
	}

	validateZipCode(zipCode) {
		cy.contains('.form-label', testData.CheckoutForm.ZipcodeText).siblings().should('have.value', zipCode)
		return this
	}
	// #endregion
}
