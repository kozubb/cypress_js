import LoginPage from "../../pages/SauceDemo/Login";

export default class Helpers {
  // Login into SauceDemo with given credentials
  loginAs({ endpoint, username, password }) {
    cy.log(`Visiting login page: ${endpoint}`);
    const loginPage = new LoginPage();

    // Visit the login page
    cy.visit(endpoint);

    cy.log(`Logging in as user: ${username}`);
    // Fill in username and password, then submit
    loginPage
      .fillInput("username", username)
      .fillInput("password", password)
      .pressLoginButton();

    return this;
  }

  // Remove currency symbols from a string and return numeric part
  removeCurrencySymbol(string) {
    let formattedString = string
      .text()
      .replace(/[\$£€+]/g, "")
      .trim();
    return formattedString;
  }

  // Remove numeric price and return only currency symbols
  removePrice(string) {
    let formattedString = string
      .text()
      .replace(/[0-9]+,?.[0-9]{2}/g, "")
      .trim();
    return formattedString;
  }

  // Remove special characters and convert string to lowercase
  removeSpecialChars = (string) => {
    let formattedString = string
      .replace(/[&\/\\#,+()~%_.'":*?<>{} ]/g, "")
      .toLowerCase();
    return formattedString;
  };

  // Convert comma to dot and parse string to float
  changeCommaSign(string) {
    let formattedString = parseFloat(string.trim().replace(",", "."));
    return formattedString;
  }

  // Validate that price and currency symbol match expected values
  priceValidator(
    currentPriceElement,
    expectedPriceValue,
    expectedCurrencySymbol
  ) {
    let expectedPriceAsNumberFixed = +expectedPriceValue.toFixed(2);
    let price = this.changeCommaSign(
      this.removeCurrencySymbol(currentPriceElement)
    );
    let currencySymbol = this.removeSpecialChars(
      this.removePrice(currentPriceElement)
    );

    // Assert that numeric price matches expected
    expect(price).to.be.equal(expectedPriceAsNumberFixed);

    // Assert that currency symbol matches expected
    expect(currencySymbol).to.be.equal(expectedCurrencySymbol);

    return this;
  }
}
