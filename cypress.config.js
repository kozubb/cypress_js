const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/tests/**/*.cy.js",
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: "mochawesome,ctrf-mocha-reporter",
      mochawesomeReporterOptions: {
        reportDir: "cypress/reports/mocha",
        quiet: true,
        overwrite: false,
        html: false,
        json: true,
      },
      ctrfMochaReporterOptions: {
        outputDir: "cypress/reports/ctf",
      },
    },
  },
});
