import LoginPage from '../../pages/SauceDemo/Login'
import Helpers from '../../pages/SauceDemo/Helpers'
import ProductListing from '../../pages/SauceDemo/ProductListing'
import Cart from '../../pages/SauceDemo/Cart'
import Checkout from '../../pages/SauceDemo/Checkout'
import Overview from '../../pages/SauceDemo/Overview'
import testData from '../../fixtures/SauceDemo/TestData'

describe('Sauce Demo - Visual Regression Suite', () => {
	it('Login page - initial state and filled form', () => {
		const login = new LoginPage()

		// Step 1: Navigate to the login page
		cy.visit(testData.Endpoint)

		// Visual verification: Empty login page baseline
		cy.matchImageSnapshot('01-login-page-default')

		// Step 2: Fill form and check UI state
		login.fillInput('username', testData.Users.StandardUser.Username)
		login.fillInput('password', testData.Users.StandardUser.Password)

		cy.matchImageSnapshot('02-login-page-filled')
	})

	it('Login error - validation message look', () => {
		const login = new LoginPage()

		// Step 1: Navigate and trigger error
		cy.visit(testData.Endpoint)
		login.fillInput('username', testData.Users.LockedUser.Username)
		login.fillInput('password', testData.Users.LockedUser.Password)
		login.pressLoginButton()

		// Visual verification: only error component
		cy.get('.error-message-container').matchImageSnapshot('03-login-error-message')
	})

	it('Full order placement flow - Visual Regression', () => {
		const productListing = new ProductListing()
		const cart = new Cart()
		const helpers = new Helpers()
		const checkout = new Checkout()
		const overview = new Overview()

		// Step 2: Log in
		helpers.loginAs({
			endpoint: testData.Endpoint,
			username: testData.Users.StandardUser.Username,
			password: testData.Users.StandardUser.Password
		})

		// Step 3: Inventory Page
		cy.url().should('include', '/inventory.html')
		cy.matchImageSnapshot('04-inventory-page')

		// Step 4: Add products to cart
		productListing.pressAddToOrderButton(testData.Products.Backpack.Name)
		productListing.pressAddToOrderButton(testData.Products.BikeLight.Name)

		// Cart badge snapshot
		cy.get('.shopping_cart_badge').matchImageSnapshot('05-cart-badge-count')

		// Step 5: Shopping Cart Page
		productListing.pressShoppingCartIcon()
		cy.url().should('include', '/cart.html')
		cy.matchImageSnapshot('06-shopping-cart')

		// Step 6: Checkout Information Page
		cart.pressCheckoutButton()
		cy.url().should('include', '/checkout-step-one.html')

		cy.matchImageSnapshot('07-checkout-form-empty')

		checkout.fillCheckoutInput(testData.CheckoutForm.FirstNameText, testData.Users.OrderUser.FirstName)
		checkout.fillCheckoutInput(testData.CheckoutForm.LastNameText, testData.Users.OrderUser.LastName)
		checkout.fillCheckoutInput(testData.CheckoutForm.ZipcodeText, testData.Users.OrderUser.Zipcode)

		cy.matchImageSnapshot('08-checkout-form-filled')
		checkout.pressContinueButton()

		// Step 7: Overview
		cy.url().should('include', '/checkout-step-two.html')
		cy.matchImageSnapshot('09-order-overview')

		// Step 8: Thank You Page
		overview.pressFinishButton()
		cy.url().should('include', '/checkout-complete.html')

		cy.matchImageSnapshot('10-thank-you-page')
	})
})
