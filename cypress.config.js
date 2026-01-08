const { defineConfig } = require('cypress')
const { GenerateCtrfReport } = require('cypress-ctrf-json-reporter')
const { createHtmlReport } = require('axe-html-reporter')
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin')
const fs = require('fs')

module.exports = defineConfig({
	e2e: {
		specPattern: 'cypress/e2e/**/*.cy.js',
		viewportWidth: 1280,
		viewportHeight: 800,

		env: {
			imageSnapshot: {
				failureThreshold: 0.03,
				failureThresholdType: 'percent'
			}
		},

		experimentalMemoryManagement: true,
		trashAssetsBeforeRuns: false,
		retries: {
			runMode: 1,
			openMode: 0
		},
		blockHosts: ['*.google-analytics.com', '*.contentsquare.net'],
		redirectionLimit: 100,
		waitForAnimations: true,
		chromeWebSecurity: false,
		defaultCommandTimeout: 18000,
		pageLoadTimeout: 20000,
		requestTimeout: 15000,
		responseTimeout: 20000,
		screenshotOnRunFailure: true,
		video: false,
		reporter: 'cypress-multi-reporters',
		reporterOptions: {
			reporterEnabled: 'mochawesome',
			mochawesomeReporterOptions: {
				reportDir: 'cypress/reports/mocha',
				quiet: true,
				overwrite: false,
				html: false,
				json: true
			},
			cypressJunitReporterOptions: {
				mochaFile: 'cypress/reports/test-results-[hash].xml'
			}
		},

		setupNodeEvents(on, config) {
			addMatchImageSnapshotPlugin(on, config)

			new GenerateCtrfReport({ on })

			on('task', {
				generateAxeReport({ results, projectKey, fileName }) {
					const reportDir = 'axe-reports'
					try {
						if (!fs.existsSync(reportDir)) {
							fs.mkdirSync(reportDir, { recursive: true })
						}

						createHtmlReport({
							results,
							options: {
								projectKey,
								outputDir: reportDir,
								reportFileName: `${fileName}.html`
							}
						})

						console.log(`[Node] Report created: ${reportDir}/${fileName}.html`)
						return true
					} catch (error) {
						console.error('[Node] Error generating report:', error)
						return error.message
					}
				}
			})

			return config
		}
	}
})
