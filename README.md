# Cypress with JavaScript - E2E Testing

## Project Description

This project demonstrates an end-to-end (E2E) testing framework using **Cypress** with **JavaScript**. It includes automated tests for:

- **Frontend testing**: login, registration, adding products behaviour and product purchase process.
- **API testing**: testing GET, POST, PUT, and DELETE requests.
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

### **API Tests**:

- GET, POST, PUT, and DELETE requests

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

### API Tests

- Faster and more reliable than UI tests
- Used to validate backend logic **independently**
- Reduce the need for excessive E2E coverage

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

---

## Trade-offs and Limitations

### Cypress-related trade-offs

- No true multi-tab support
- Limited cross-domain testing
- Single-browser focus

**These limitations are accepted because:**

- The tested applications do not require multi-tab workflows
- The goal is **fast, stable feedback**, not exhaustive browser coverage

## Future Goals

- Implement **visual regression tests** to detect UI changes automatically
- Implement **accessibility (a11y) tests** to ensure compliance with accessibility standards

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

npm run cy:run:chrome

- Runs all tests headlessly in Chrome
- Recommended for CI/CD pipelines

### NPM Scripts

- `"cy:open:chrome": "npx cypress open --browser chrome"`
- `"cy:run:chrome": "cypress run --browser chrome --headless"`
