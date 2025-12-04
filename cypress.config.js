const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

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
    pageLoadTimeout: 30000,
    requestTimeout: 25000,
    responseTimeout: 60000,
    screenshotOnRunFailure: true,
    video: false,
    reporters: [[allureWriter]],
    reporterOptions: {
      mochawesomeReporterOptions: {
        reportDir: "cypress/reports",
        quiet: true,
        overwrite: false,
        html: true,
        json: true,
      },
    },
    env: {
      allure: true,
      allureReuseAfterSpec: true,
    },
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
