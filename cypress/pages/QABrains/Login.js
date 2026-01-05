export default class LoginPage {
	loginButton = ".btn-submit:contains('Login')"
	logoutButton = ".btn-submit:contains('Logout')"

	// #region Actions on UI elements

	// Fill input field by input name and expected text
	fillInput(inputName, expectedText) {
		cy.log(`Filling ${inputName} input by ${expectedText}`)
		cy.get(`input[name='${inputName}']`).should('be.visible').type(expectedText)
		return this
	}

	// Press login button
	pressLoginButton() {
		cy.log('Pressing login button')
		cy.get(this.loginButton).click()
		return this
	}

	// Press logout button
	pressLogoutButton() {
		cy.log('Pressing logout button')
		cy.get(this.logoutButton).click()
		return this
	}

	// #endregion

	// #region Validations on UI elements

	// Check if login button is visible on the page
	validateIfLoginButtonIsVisible() {
		cy.log('Validating that login button is visible')
		cy.get(this.loginButton).should('be.visible')
		return this
	}

	// Check if logout button is visible on the page
	validateIfLogoutButtonIsVisible() {
		cy.log('Validating that logout button is visible')
		cy.get(this.logoutButton).should('be.visible')
		return this
	}

	// Check login success message
	validateLoginSuccessMessage(expectedText) {
		cy.log(`Validating if login success message is: ${expectedText}`)
		cy.get('.success-msg .mb-3').should('be.visible').and('have.text', expectedText) // Check if the login successful message is displayed
		return this
	}

	// #endregion
}
