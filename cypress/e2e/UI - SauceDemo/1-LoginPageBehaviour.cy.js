import LoginPage from '../../pages/SauceDemo/Login'
import ProductListing from '../../pages/SauceDemo/ProductListing'
import HamburgerMenu from '../../pages/SauceDemo/HamburgerMenu'
import testData from '../../fixtures/SauceDemo/TestData'

describe('Login into account and logout - success', () => {
	// Step 1: Initialize page objects
	const login = new LoginPage()
	const productListing = new ProductListing()
	const hamburgerMenu = new HamburgerMenu()

	it('should log in and log out - success', () => {
		// Step 2: Navigate to the login page
		cy.visit(testData.Endpoint)

		// Step 3: Fill in the login form with valid credentials
		login.fillInput('username', testData.Users.StandardUser.Username)
		login.fillInput('password', testData.Users.StandardUser.Password)

		// Step 4: Press the login button
		login.pressLoginButton()

		// Step 5: Verify successful login
		cy.url().should('include', '/inventory.html')
		productListing.validateIfCartIsVisible()

		// Step 6: Open hamburger menu and log out
		hamburgerMenu.pressHamburgerMenuIcon()
		hamburgerMenu.pressHamburgerMenuLogoutBtn()

		// Step 7: Verify return to login page
		cy.url().should('eq', `${testData.Endpoint}/`)
		login.validateIfLoginButtonIsVisible()
	})

	it('login - wrong password', () => {
		// Step 2: Navigate to the login page
		cy.visit(testData.Endpoint)

		// Step 3: Fill in the login form with username and wrong password
		login.fillInput('username', testData.Users.StandardUser.Username)
		login.fillInput('password', testData.Users.StandardUser.IncorrectPassword)

		// Step 4: Press the login button
		login.pressLoginButton()

		// Step 5: Verify error message for wrong credentials
		login.validateLoginErrorMessage(testData.Messages.WrongDataMessage)
	})

	it('login - user is locked', () => {
		// Step 2: Navigate to the login page
		cy.visit(testData.Endpoint)

		// Step 3: Fill in the login form with locked-out username
		login.fillInput('username', testData.Users.LockedUser.Username)
		login.fillInput('password', testData.Users.LockedUser.Password)

		// Step 4: Press the login button
		login.pressLoginButton()

		// Step 5: Verify error message for locked user
		login.validateLoginErrorMessage(testData.Messages.LockedUserMessage)
	})
})
