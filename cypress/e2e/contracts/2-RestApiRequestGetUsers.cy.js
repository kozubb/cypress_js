import { z } from 'zod'

//API CONTRACT DEFINITIONS

const AddressSchema = z.object({
	street: z.string(),
	suite: z.string(),
	city: z.string(),
	zipcode: z.string(),
	geo: z.object({
		lat: z.string(),
		lng: z.string()
	})
})

const CompanySchema = z.object({
	name: z.string(),
	catchPhrase: z.string(),
	bs: z.string()
})

const UserResponseSchema = z.object({
	id: z.number(),
	name: z.string(),
	username: z.string(),
	email: z.string().email(),
	address: AddressSchema,
	phone: z.string(),
	website: z.string(),
	company: CompanySchema
})

// TEST DATA & CONFIGURATION
const restApiUrl = 'https://jsonplaceholder.typicode.com/'
const path = 'users'
const notExistedPath = 'userstest'

const expectedValues = {
	name: 'Kurtis Weissnat',
	username: 'Elwyn.Skiles',
	city: 'Howemouth',
	companyName: 'Johns Group',
	catchPhrase: 'Configurable multimedia task-force'
}

describe('JSONPlaceholder - User API Validation', () => {
	it('GET Request for User Data - Contract & Value Validation', () => {
		// Step 1: Execute GET request
		cy.request({
			method: 'GET',
			url: `${restApiUrl}${path}/7`,
			headers: {
				Accept: 'application/json'
			}
		}).then(response => {
			// Step 2: Verify status
			expect(response.status).to.eq(200)

			// STEP 3: CONTRACT VALIDATION

			const contractValidation = UserResponseSchema.safeParse(response.body)

			if (!contractValidation.success) {
				const errorDetails = JSON.stringify(contractValidation.error.format(), null, 2)
				cy.log('Contract Violation Details:', errorDetails)
				console.error('Contract Violation Details:', contractValidation.error.format())
			}

			expect(contractValidation.success, 'API response must match the User Contract').to.be.true

			// STEP 4: FUNCTIONAL DATA VALIDATION

			const validatedData = contractValidation.data

			expect(validatedData.name).to.eq(expectedValues.name)
			expect(validatedData.username).to.eq(expectedValues.username)
			expect(validatedData.address.city).to.eq(expectedValues.city)
			expect(validatedData.company.name).to.eq(expectedValues.companyName)
			expect(validatedData.company.catchPhrase).to.eq(expectedValues.catchPhrase)
		})
	})

	it('GET Request for User Data (404 Not Found)', () => {
		cy.request({
			method: 'GET',
			url: `${restApiUrl}${notExistedPath}/7`,
			failOnStatusCode: false
		}).then(response => {
			expect(response.status).to.eq(404)
		})
	})
})
