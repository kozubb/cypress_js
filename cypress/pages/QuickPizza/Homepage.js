export default class Homepage {
	// #region Actions on UI elements

	// Press pizza button
	pressPizzaButton() {
		cy.log('Pressing pizza button')
		cy.contains('button', /pizza, please!/i).click()
		return this
	}

	// Press 'love it' button
	pressRecommendButton() {
		cy.log('Pressing recommenda button')
		cy.contains('button', /love it!/i).click()
		return this
	}

	// Press 'no thanks' button
	pressNoThanksButton() {
		cy.log(`Pressing 'No thanks' button`)
		cy.contains('button', /no thanks/i).click()
	}

	// #endregion

	// #region Validations on UI elements

	// Check if 'no thanks' button is visible on the page
	validateIfNoThanksIsVisible() {
		cy.log('Validating if no thanks button is visible')
		cy.contains('button', /love it!/i).should('be.visible')
	}
	// Check message after rating
	validateRatingMessage(expectedText) {
		cy.log(`Validating if rating message have text: ${expectedText}`)
		cy.get('#rate-result').should('have.text', expectedText)
	}

	// #endregion
}
