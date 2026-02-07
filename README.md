# Cypress with JavaScript - E2E Testing

## Project Description

This project demonstrates an end-to-end (E2E) testing framework using **Cypress** with **JavaScript**. It includes automated tests for:

- **Frontend testing**: login, registration, adding products behaviour and product purchase process.
- **API testing**: testing GET, POST, PUT, and DELETE requests.
- **Contract Testing with Zod**: testing GET requests using Zod library.
- **Accessibility (a11y) Audits**: tests are using cypress axe library library to ensure **WCAG 2.1** compliance and generate reports.
- **Visual Regression Testing**: utilizes pixel-by-pixel comparison to detect UI inconsistencies, layout shifts, and styling issues across critical user journeys.
- **Cross-browser testing**: tests are run on **Chrome**.
- **CI/CD pipeline**: integrated fully with **GitHub Actions**, including test execution and reporting.

---

## Key Features

### **Frontend Tests**:

1. **QA Brains**
   - Existing frontend tests for the QA Brains website.
   - Includes login, registration, and product purchase flows.
   - Implemented using **Page Object Pattern** for maintainability and clarity.

2. **Sauce Demo**
   - Frontend tests for [Sauce Demo](https://www.saucedemo.com) website.
   - Covers:
     - User login
     - Adding products to the cart
     - Complete order placement process (checkout and confirmation)
   - Implemented using **Page Object Pattern** for maintainability and clarity.

### API + UI Mixed Tests

- This test demonstrates an end-to-end scenario in the QuickPizza application, covering both API and UI interactions:
- CSRF Token requested from the backend before any user action.
- The token is extracted from the Set-Cookie header to secure subsequent API requests.
- User Authentication via API - the returned userToken is added to browser cookies to simulate an authenticated session.
- UI Interactions as a logged in user

### **API Tests**:

- GET, POST, PUT, and DELETE requests

### Contract API Tests

- GET requests using Zod library

### Accessibility (a11y) Audits:

- Automated scans using cypress axe library to ensure **WCAG 2.1** compliance.
- Custom logic to generate visual **HTML reports** whenever violations are detected.
- Navigation using keyboard keys

### Visual Regression Testing

- Automated UI comparison for [Sauce Demo](https://www.saucedemo.com).
- Captures and compares screenshots of critical steps:
  - Login page states (initial vs. filled).
  - Validation error messages.
  - Full-page inventory grid (with real images).
  - Checkout flow and order summaries.
- Ensures pixel-perfect consistency.

### **Cross-Browser Testing**:

- Runs on **Chrome** browser

### **CI/CD with GitHub Actions**:

- Full integration of Cypress tests within GitHub Actions
- Test reports available in **HTML** format
- Results displayed in **GitHub Actions summary** and as **artifacts** (HTML)

### **Test Documentation**:

- Detailed comments in the test code for easy understanding of the test flow, especially for non-technical people.

---

## Tech Stack

- **Cypress**: For browser automation and E2E testing
- **JavaScript**: For writing tests with Cypress
- **GitHub Actions**: For CI/CD and test automation
- **Node.js**: JavaScript runtime
- **HTML Reports**: For detailed test reporting

---

## Test Strategy

The project follows a **balanced testing pyramid approach**.

### Frontend E2E Tests

- Focus only on **business-critical user flows**
- Validate real UI behavior from an **end-user perspective**
- Avoid over-testing UI details
- Written with **stability and readability** in mind

### API + UI Mixed Test

- Automates the pizza rating flow from login to UI interaction
- Login via API for faster and more reliable authentication
- Uses CSRF token and qp_user_token for authenticated requests
- Ensures stable end-to-end coverage for a critical user flow

### API Tests

- Faster and more reliable than UI tests
- Used to validate backend logic **independently**
- Reduce the need for excessive E2E coverage

### API Contract Testing

- **Contract Testing with Zod**:
  - Implementation of **Schema Validation** to ensure API responses match expected structures.
  - Validating data types, mandatory fields, and nested objects (e.g., address and company details).

## ♿ Accessibility Testing (a11y)

This project integrates automated accessibility audits to ensure compliance with **WCAG 2.1** standards:

- **Engine:** cypress-axe
- Validation of navigation using keyboard navigation to simulate user interactions in accordance with
  accessibility guidelines and allow moving through the application without a mouse.
- Build can be run manually in Github Actions
- **Reporting:** - If violations are found, a detailed **HTML Report** is generated.
  - Reports are saved as **GitHub Action Artifacts**.
  - Custom console logging provides immediate feedback on the number of violations.

## 📸 Visual Regression Testing

- **Goal**: Detect pixel-level layout shifts, styling bugs.
- **Pixel Perfection**: No masking used to ensure 100% accuracy of product images and prices.
- **Source of Truth**: Snapshots are managed via GitHub Actions to match the Linux CI environment.

---

## Design Decisions

### Page Object Pattern

Each page has its own class containing:

- UI actions
- Validations

**Benefits:**

- Tests remain clean and focused only on **business flow**
- Easier maintenance when selectors or UI structure change

### Cypress with JavaScript

JavaScript was chosen because it offers:

- Faster onboarding
- Less configuration overhead
- Native Cypress ecosystem support

### Chrome-only Execution

Chrome is selected as the primary browser because:

- It reflects the most common real-user environment
- Reduces test flakiness
- Simplifies CI configuration

### Contract Testing with Zod

- Instead of just checking status codes, the project uses **Zod** for schema validation.
- **Why Zod?**
  - **Type Safety**: Automatically infers types from schemas.
  - **Resilience**: Tests fail immediately if the backend changes a field name or data type, even if the status code is still 200.
  - **Detailed Error Reporting**: Provides clear information on which exact field in a deeply nested JSON failed validation.

---

## Trade-offs and Limitations

### Cypress-related trade-offs

- No true multi-tab support
- Limited cross-domain testing
- Single-browser focus

**These limitations are accepted because:**

- The tested applications do not require multi-tab workflows
- The goal is **fast, stable feedback**, not exhaustive browser coverage

## In progress

- Implement **accessibility (a11y) tests** to ensure compliance with accessibility standards WCAG - it will be done using axe library for playwright
- Implement **visual regression tests** to detect UI changes automatically

- Implement **visual regression tests** to detect UI changes automatically

## Future Goals

- To provide a comprehensive quality assurance ecosystem that validates functional correctness, API integrity, and UI consistency, while actively monitoring web performance and accessibility to ensure a seamless, high-speed user experience.

---

## How to Run Tests

### Prerequisites

- Node.js (recommended LTS version)
- npm (comes with Node.js)

### Install Dependencies

npm install

Installs all required packages for running the Cypress tests.

### Run Cypress Tests

You can run tests either in interactive mode (for development/debugging) or in headless mode (for CI/CD).

**Open Cypress Test Runner (Chrome)**

npm run cy:open:chrome

- Opens Cypress UI
- Allows running tests interactively in Chrome

**Run Cypress tests headlessly (Chrome)**

`npm run cy:run:chrome -- --spec 'cypress/e2e/**/*' --config excludeSpecPattern='**/a11y/**/*' `

- Runs all tests headlessly in Chrome
- Recommended for CI/CD pipelines

### NPM Scripts

- `"cy:open:chrome": "npx cypress open --browser chrome"`
- `"cy:run:chrome": "cypress run --browser chrome --headless"`

### How to Run accessibility tests:

**Run only accessibility tests**

`npm run cy:run:chrome -- --spec 'cypress/e2e/a11y/**/*'`

**View the results**

Open /axe-reports/accessibility-report.html in your browser

Open /cypress/reports/mochareports/report.html in your browser
