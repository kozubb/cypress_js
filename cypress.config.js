const { defineConfig } = require("cypress");
const { GenerateCtrfReport } = require("cypress-ctrf-json-reporter");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/tests/**/*.cy.js",
    experimentalMemoryManagement: true,
    trashAssetsBeforeRuns: false,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    blockHosts: ["*.google-analytics.com", "*.contentsquare.net"],
    redirectionLimit: 100,
    waitForAnimations: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 18000,
    pageLoadTimeout: 20000,
    requestTimeout: 15000,
    responseTimeout: 20000,
    screenshotOnRunFailure: true,
    video: false,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: "mochawesome",
      mochawesomeReporterOptions: {
        reportDir: "cypress/reports/mocha",
        quiet: true,
        overwrite: false,
        html: false,
        json: true,
      },
      cypressJunitReporterOptions: {
        mochaFile: "cypress/reports/test-results-[hash].xml",
      },
    },
    setupNodeEvents(on, config) {
      new GenerateCtrfReport({
        on,
      });
    },
  },
});
