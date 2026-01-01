import Helpers from '../../pages/SauceDemo/Helpers'
import ProductListing from '../../pages/SauceDemo/ProductListing'
import Cart from '../../pages/SauceDemo/Cart'
import Checkout from '../../pages/SauceDemo/Checkout'
import Overview from '../../pages/SauceDemo/Overview'
import ThankYouPage from '../../pages/SauceDemo/ThankYouPage'
import testData from '../../fixtures/SauceDemo/TestData'

describe('Place order', () => {
	it('should place an order successfully', () => {
		// Step 1: Initialize page objects
		const helpers = new Helpers()
		const productListing = new ProductListing()
		const cart = new Cart()
		const checkout = new Checkout()
		const overview = new Overview()
		const thankYou = new ThankYouPage()

		// Step 2: Log in as standard user
		helpers.loginAs({
			endpoint: testData.Endpoint,
			username: testData.Users.StandardUser.Username,
			password: testData.Users.StandardUser.Password
		})
		// Step 3: Verify inventory page is loaded
		cy.url().should('include', '/inventory.html')
		productListing.validateIfCartIsVisible()

		// Step 4: Add products from listing page
		productListing.pressAddToOrderButton(testData.Products.Backpack.Name).validateShoppingCartAmount('1')

		productListing.pressAddToOrderButton(testData.Products.BikeLight.Name).validateShoppingCartAmount('2')

		// Step 5: Open cart and validate product details
		productListing.pressShoppingCartIcon()

		cart
			.validateProductTitleInBasket(testData.Products.Backpack.Id, testData.Products.Backpack.Name)
			.validateProductTitleInBasket(testData.Products.BikeLight.Id, testData.Products.BikeLight.Name)
			.validateProductQuantityInCart(0, '1')
			.validateProductQuantityInCart(1, '1')
			.validateProductPriceInCart(0, testData.Products.Backpack.Price, testData.CurrencySymbol)
			.validateProductPriceInCart(1, testData.Products.BikeLight.Price, testData.CurrencySymbol)

		// Step 6: Proceed to checkout
		cart.pressCheckoutButton()

		// Step 7: Fill checkout form
		checkout
			.fillCheckoutInput(testData.CheckoutForm.FirstNameText, testData.Users.OrderUser.FirstName)
			.fillCheckoutInput(testData.CheckoutForm.LastNameText, testData.Users.OrderUser.LastName)
			.fillCheckoutInput(testData.CheckoutForm.ZipcodeText, testData.Users.OrderUser.Zipcode)
			.pressContinueButton()

		// Step 8: Validate overview page
		overview
			.validatePaymentMethod(testData.PaymentMethod)
			.validateDeliveryMethod(testData.DeliveryMethod)
			.validateSubtotal(
				testData.Products.Backpack.Price + testData.Products.BikeLight.Price,
				testData.CurrencySymbol
			)
			.validateTotalPrice(
				testData.Products.Backpack.Price +
					testData.Products.BikeLight.Price +
					(testData.Products.Backpack.Price + testData.Products.BikeLight.Price) * testData.Tax,
				testData.CurrencySymbol
			)
			.pressFinishButton()

		// Step 9: Validate Thank You page
		thankYou.validateThankYouText(testData.Messages.ThankYouMessage)
	})
})
