import RegisterPage from '../../pages/QABrains/Register'
import testData from '../../fixtures/QABrains/TestData'

// Initialize page objects
const register = new RegisterPage()

describe('Register account', () => {
	it('should register a new account', () => {
		// Step 1: Intercept backend request confirming successful registration
		cy.intercept('GET', '**/registration?registered=true**').as('registerRequest')

		// Step 2: Open registration page
		cy.visit(`${testData.Endpoint}registration`)

		// Step 3: Fill registration form
		register
			.fillName(testData.RegisterForm.Name)
			.selectCountry(testData.RegisterForm.Country)
			.selectAccountType(testData.RegisterForm.AccountType)
			.fillEmail(testData.RegisterForm.Email)
			.fillPassword(testData.RegisterForm.Password)
			.pressSignupButton()

		// Step 4: Validate backend response
		cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)

		// Step 5: Validate successful registration message
		register.validateRegistrationSuccessMessage(testData.Messages.RegisterSuccessfulMessage)
	})
})
