import ProductListing from '../../pages/SauceDemo/ProductListing'
import { A11yPage } from '../../pages/SauceDemo/AccessibilityKeys'
import testData from '../../fixtures/SauceDemo/TestData'
import LoginPage from '../../pages/SauceDemo/Login'

describe('SauceDemo - Keyboard Navigation & A11y Login Flow @a11y', () => {
	// Initialize Page Objects
	const login = new LoginPage()
	const productListing = new ProductListing()
	const navigate = new A11yPage()

	// Selectors defined using Cypress Testing Library or standard Cypress
	const loginInput = '[data-test="username"]'
	const passwordInput = '[data-test="password"]'

	beforeEach(() => {
		// Step 1: Navigate to the endpoint before each test
		cy.visit(testData.Endpoint)
	})

	it('Login as a valid user using keyboard @a11y', () => {
		// Step 2: Perform login with standard user credentials using keyboard navigation
		navigate.navigateToNextElement()
		navigate.assertFocusedElement(loginInput)

		login.fillInput('username', testData.Users.StandardUser.Username)

		navigate.navigateToNextElement()
		navigate.assertFocusedElement(passwordInput)

		login.fillInput('password', testData.Users.StandardUser.Password)
		navigate.performAction()

		// Step 3: Verify that the inventory page is loaded
		cy.url().should('include', '/inventory.html')
		productListing.validateIfCartIsVisible()
	})

	it('Login attempt with locked user, followed by successful login using keyboard', () => {
		// Step 2: Attempt login with locked user credentials using keyboard
		navigate.navigateToNextElement()
		navigate.assertFocusedElement(loginInput)

		login.fillInput('username', testData.Users.LockedUser.Username)

		navigate.navigateToNextElement()
		navigate.assertFocusedElement(passwordInput)

		login.fillInput('password', testData.Users.LockedUser.Password)
		navigate.performAction()

		// Step 3: Verify that the locked user error message is displayed
		login.validateLoginErrorMessage(testData.Messages.LockedUserMessage)

		// Step 4: Retry login with valid credentials via keyboard
		// Moving focus back (demonstrating Shift+Tab logic from A11yPage)
		navigate.navigateToPrevElement()
		navigate.assertFocusedElement(loginInput)

		login.fillInput('username', testData.Users.StandardUser.Username)
		navigate.performAction()

		login.validateIfLoginErrorMessageExist(false)
		navigate.performAction()

		// Step 5: Verify that the inventory page is loaded
		cy.url().should('include', '/inventory.html')
		productListing.validateIfCartIsVisible()
	})
})
