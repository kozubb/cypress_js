export default class RegisterPage {
	// #region Actions

	fillName(name) {
		cy.log(`Filling name: ${name}`)
		cy.get('#name').type(name)
		return this
	}

	selectCountry(country) {
		cy.log(`Selecting country: ${country}`)
		cy.get('#country').select(country)
		return this
	}

	selectAccountType(accountType) {
		cy.log(`Selecting account type: ${accountType}`)
		cy.get('#account').select(accountType)
		return this
	}

	fillEmail(email) {
		cy.log(`Filling email: ${email}`)
		cy.get('#email').type(email)
		return this
	}

	fillPassword(password) {
		cy.log('Filling password')
		cy.get('#password').type(password)
		cy.get('#confirm_password').type(password)
		return this
	}

	pressSignupButton() {
		cy.log('Pressing signup button')
		cy.get(".btn-submit:contains('Signup')").click()
		return this
	}

	// #endregion

	// #region Validations

	validateRegistrationSuccessMessage(expectedText) {
		cy.log(`Validating registration success message: ${expectedText}`)
		cy.get('.success-msg .mb-3').should('be.visible').and('have.text', expectedText)
		return this
	}

	// #endregion
}
