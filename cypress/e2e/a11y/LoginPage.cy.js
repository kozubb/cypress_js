import testData from '../../fixtures/SauceDemo/TestData'

it('Login Page Accessibility Audit', () => {
	// Navigate to the application endpoint defined in test data
	cy.visit(testData.Endpoint)

	// Inject the axe-core runtime into the browser page
	cy.injectAxe()

	// Access the browser window object to run the full axe-core analysis
	cy.window()
		.then(win => {
			// win.axe.run() returns a full results object, which is required for HTML reporting
			return win.axe.run()
		})
		.then(results => {
			// Check if any accessibility violations were detected
			if (results.violations.length > 0) {
				// TRIGGER REPORT GENERATION

				cy.task('generateAxeReport', {
					results,
					projectKey: 'SauceDemo',
					fileName: 'accessibility-report-login'
				}).then(logMessage => {
					// Output the success message from Node.js to the Cypress Command Log
					cy.log(logMessage)

					// ASSERTION

					expect(
						results.violations,
						`Found ${results.violations.length} violations. Check the 'axe-reports' folder for details.`
					).to.have.length(0)
				})
			} else {
				// Assertion for the clean path (no violations found)
				expect(results.violations).to.have.length(0)
			}
		})
})
