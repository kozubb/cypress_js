import LoginPage from "../Login";

//Helper responsible for logging user into SauceDemo page
export function loginAs({ endpoint, username, password }) {
  const loginPage = new LoginPage();

  // Navigate to login page
  cy.visit(endpoint);

  // Fill login form
  loginPage.fillInput("username", username);
  loginPage.fillInput("password", password);

  // Submit login form
  loginPage.pressLoginButton();
}
