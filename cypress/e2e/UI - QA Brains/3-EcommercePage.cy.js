import Helpers from '../../pages/QABrains/Helpers'
import ProductListing from '../../pages/QABrains/ProductListing'
import Cart from '../../pages/QABrains/Cart'
import Checkout from '../../pages/QABrains/Checkout'
import Overview from '../../pages/QABrains/Overview'
import ThankYouPage from '../../pages/QABrains/ThankYouPage'
import testData from '../../fixtures/QABrains/TestData'

// Initialize page objects
const helpers = new Helpers()
const productListing = new ProductListing()
const cart = new Cart()
const checkout = new Checkout()
const overview = new Overview()
const thankYou = new ThankYouPage()

describe('E2E test - place order', () => {
	it('should place an order successfully', () => {
		// Step 1: Login
		helpers.loginAs({
			endpoint: `${testData.Endpoint}ecommerce/login`,
			username: testData.Users.OrderUser.Username,
			password: testData.Users.OrderUser.Password
		})

		// Step 2: Add product
		productListing
			.addProductToCartByName(testData.Products.Shoe.Name)
			.validateCartAmount('1')
			.openCart(testData.Endpoint)

		// Step 3: Cart validations
		cart
			.validateRemoveButtonVisible()
			.validateProductInCart(testData.Products.Shoe.Name, testData.Products.Shoe.Price)
			.validateProductPriceInCart(testData.Products.Shoe.Price, testData.CurrencySymbol)
			.pressCheckoutButton()

		// Step 4: Checkout
		checkout
			.validateEmailIsDisabled(testData.Users.OrderUser.Username)
			.fillInput(testData.CheckoutForm.FirstNameText, testData.Users.OrderUser.FirstName)
			.fillInput(testData.CheckoutForm.LastNameText, testData.Users.OrderUser.LastName)
			.validateZipCode(testData.Users.OrderUser.Zipcode)
			.pressContinueButton()

		// Step 5: Overview
		overview
			.validateTotalPrice(testData.Products.Shoe.Price + testData.DeliveryPrice, testData.CurrencySymbol)
			.pressFinishButton()

		// Step 6: Confirmation
		thankYou.validateThankYouMessage(testData.Messages.ThankYouMessage)
	})
})
