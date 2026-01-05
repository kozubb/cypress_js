export default class ThankYouPage {
	validateThankYouMessage(expectedText) {
		cy.get('h3.text-lg').should('have.text', expectedText)

		return this
	}
}
