# Cypress with JavaScript - E2E Testing

## Project Description

This project demonstrates an end-to-end (E2E) testing framework using **Cypress** with **JavaScript**. It includes automated tests for:

- **Frontend testing**: login, registration, and product purchase process.
- **API testing**: testing GET, POST, PUT, and DELETE requests.
- **Cross-browser testing**: tests are run on **Chrome**.
- **CI/CD pipeline**: integrated fully with **GitHub Actions**, including test execution and reporting.

---

## Key Features

### **Frontend Tests**:

1. **QA Brains (Current site under maintenance)**

   - Existing frontend tests for the QA Brains website.
   - Currently **skipped** due to site being in maintenance mode.
   - Includes login, registration, and product purchase flows.

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
