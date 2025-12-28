export default class HamburgerMenu {
  hamburgerMenuIcon = "#react-burger-menu-btn";
  logoutButton = '[data-test="logout-sidebar-link"]';

  // #region Actions on UI elements

  // Click the hamburger menu icon
  pressHamburgerMenuIcon() {
    cy.log("Clicking the hamburger menu icon");
    cy.get(this.hamburgerMenuIcon).click();
    return this;
  }

  // Click the logout button in the hamburger menu
  pressHamburgerMenuLogoutBtn() {
    cy.log("Clicking the logout button in the hamburger menu");
    cy.get(this.logoutButton).click();
    return this;
  }

  // #endregion

  // #region Validations on UI elements

  // Placeholder for future validations
  // e.g., check if menu is visible, logout button exists, etc.

  // #endregion
}
