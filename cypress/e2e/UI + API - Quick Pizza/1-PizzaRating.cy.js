import Homepage from '../../pages/QuickPizza/Homepage'
import testData from '../../fixtures/QuickPizza/TestData'

// Variables shared across tests
let csrfToken
let userToken

// Runs once before all tests
before(() => {
	// 1. Request CSRF token from backend
	cy.request({
		method: 'POST',
		url: `${testData.Endpoint}api/csrf-token`
	}).then(response => {
		// Extract CSRF token from Set-Cookie header
		const setCookieHeader = response.headers['set-cookie']
		const match = setCookieHeader?.join(';').match(/csrf_token=([^;]+)/)
		csrfToken = match?.[1]

		// Validate CSRF token existence
		expect(csrfToken, 'CSRF token').to.exist
	})

	// 2. Log in user using CSRF token
	cy.then(() => {
		cy.request({
			method: 'POST',
			url: `${testData.Endpoint}api/users/token/login?set_cookie=true`,
			body: {
				username: testData.UserCredentials.Username,
				password: testData.UserCredentials.Password,
				csrf: csrfToken
			},
			headers: {
				'Content-Type': 'application/json',
				'X-Csrf-Token': csrfToken
			}
		}).then(res => {
			// Save user token for later use
			userToken = res.body.token

			// Validate user token existence
			expect(userToken, 'User token').to.exist
		})
	})
})

it('Provide rating for pizza', () => {
	const homepage = new Homepage()

	// 3. Set authentication cookie before visiting the page
	cy.setCookie('token', userToken)

	// 4. Intercept API calls before triggering them
	cy.intercept('POST', '/api/pizza').as('pizzaResponse')
	cy.intercept('POST', '/api/ratings').as('ratingResponse')

	// 5. Visit application homepage
	cy.visit(testData.Endpoint)

	// 6. Click pizza button and wait for pizza API response
	homepage.pressPizzaButton()
	cy.wait('@pizzaResponse').its('response.statusCode').should('eq', 200)

	// 7. Rate pizza as "recommended"
	homepage.pressRecommendButton()
	cy.wait('@ratingResponse').its('response.statusCode').should('eq', 201)

	// 8. Validate UI after rating
	homepage.validateIfNoThanksIsVisible()
	homepage.validateRatingMessage(testData.RatingMessage)

	// 9. Click "No thanks" button and validate second rating request
	homepage.pressNoThanksButton()
	cy.wait('@ratingResponse').its('response.statusCode').should('eq', 201)
})
