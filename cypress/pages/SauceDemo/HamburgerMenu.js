class HamburgerMenu {
  hamburgerMenuIcon = "#react-burger-menu-btn";
  logoutButton = '[data-test="logout-sidebar-link"]';

  // #region Actions on UI elements

  // Click on the hamburger menu icon
  pressHamburgerMenuIcon() {
    cy.log("Pressing hambruegr menu icon");
    cy.get(this.hamburgerMenuIcon).click();
  }

  // Click on the logout button in the hamburger menu
  pressHamburgerMenuLogoutBtn() {
    cy.log("Pressing logout link btn");
    cy.get(this.logoutButton).click();
  }

  // #endregion

  // #region Validations on UI elements

  // (No validation code here, but you can add assertions if needed)

  // #endregion
}

export default HamburgerMenu;
