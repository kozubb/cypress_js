import LoginPage from '../../pages/QABrains/Login'
import testData from '../../fixtures/QABrains/TestData'

// Initialize page objects
const login = new LoginPage()

describe('Login into account', () => {
	it('should log in and log out successfully', () => {
		// Step 1: Open QA Brains login page
		cy.visit(testData.Endpoint)

		// Step 2: Fill in login form with valid user credentials
		login
			.fillInput('email', testData.Users.SuccessUser.Username)
			.fillInput('password', testData.Users.SuccessUser.Password)
			.pressLoginButton()

		// Step 3: Wait for backend response confirming successful login
		cy.intercept('GET', `${testData.Endpoint}?logged=true*`).as('loginRequest')
		cy.wait('@loginRequest').its('response.statusCode').should('eq', 200)

		// Step 4: Validate successful login UI state
		login.validateLoginSuccessMessage(testData.Messages.LoginSuccessMessage).validateIfLogoutButtonIsVisible()

		// Step 5: Log out from the application
		login.pressLogoutButton()

		// Step 6: Wait for backend response confirming logout
		cy.intercept('GET', '/?_rsc*').as('logoutRequest')
		cy.wait('@logoutRequest').its('response.statusCode').should('eq', 200)

		// Step 7: Verify user is logged out and login button is visible again
		login.validateIfLoginButtonIsVisible()
	})
})
