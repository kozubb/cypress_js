import { z } from 'zod'

// API CONTRACT DEFINITIONS

const PlaceSchema = z.object({
	'place name': z.string(),
	longitude: z.string(),
	state: z.string(),
	'state abbreviation': z.string(),
	latitude: z.string()
})

const ZipCodeResponseSchema = z.object({
	'post code': z.string(),
	country: z.string(),
	'country abbreviation': z.string(),
	places: z.array(PlaceSchema)
})

const EmptyResponseSchema = z.object({}).strict()

// TEST DATA & CONFIGURATION
const restApiUrl = 'https://api.zippopotam.us/'
const countryCode = 'us'
const zipCode = 28270
const notExistedZipCode = 11111
const expectedData = {
	country: 'United States',
	stateName: 'North Carolina',
	city: 'Charlotte',
	stateAbbr: 'NC'
}

describe('Zipcode API - Contract & Functional Validation', () => {
	it('GET Request Zipcode - Contract & Functional Validation', () => {
		cy.request({
			method: 'GET',
			url: `${restApiUrl}${countryCode}/${zipCode}`,
			headers: {
				Accept: 'application/json'
			}
		}).then(response => {
			// Step 2: Basic HTTP status validation
			expect(response.status).to.eq(200)

			// STEP 3: CONTRACT VALIDATION

			const contractValidation = ZipCodeResponseSchema.safeParse(response.body)

			if (!contractValidation.success) {
				console.error('Contract Violation:', contractValidation.error.format())
			}

			expect(contractValidation.success, 'The API response should match the Zod contract').to.be.true

			// STEP 4: FUNCTIONAL DATA VALIDATION

			const validatedData = contractValidation.data

			expect(validatedData.country).to.eq(expectedData.country)
			expect(validatedData.places[0]['place name']).to.eq(expectedData.city)
			expect(validatedData.places[0].state).to.eq(expectedData.stateName)
			expect(validatedData.places[0]['state abbreviation']).to.eq(expectedData.stateAbbr)
		})
	})

	it('GET Request Zipcode - Not Found (404) Contract Validation', () => {
		cy.request({
			method: 'GET',
			url: `${restApiUrl}${countryCode}/${notExistedZipCode}`,
			failOnStatusCode: false
		}).then(response => {
			// Step 2: Validate 404 Status
			expect(response.status).to.eq(404)

			// Step 3: Validate Contract (Empty object)
			const contractValidation = EmptyResponseSchema.safeParse(response.body)

			expect(contractValidation.success, '404 response should be an empty object').to.be.true
		})
	})
})
