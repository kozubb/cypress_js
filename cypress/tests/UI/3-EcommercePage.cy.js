// Initial test data
const endpoint = "https://practice.qabrains.com/";
const email = "test@qabrains.com";
const password = "Password123";
const shoeName = "Sample Shoe Name";
const firstName = "TestName";
const lastName = "TestLasNname";
const zipCode = 1207;
const shoePrice = 89.0;
const deliveryPrice = 4.45;
const totalPrice = shoePrice + deliveryPrice;
const thankYouMessage = "Thank you for your order!";

// Helper function for login
const login = () => {
  cy.visit(`${endpoint}ecommerce/login`);

  cy.findByRole("textbox", { name: /email/i }).type(email);
  cy.findByRole("textbox", { name: /password/i }).type(password);

  cy.intercept("GET", `${endpoint}ecommerce?_rsc*`).as("loginPage");
  cy.intercept("GET", `${endpoint}ecommerce/product-details*`).as("products");

  cy.findByRole("button", { name: /login/i }).click();

  cy.wait("@loginPage");
  cy.wait("@products");

  cy.get(".user-name").should("have.text", email);
};

describe("E2E test - place order", () => {
  it("should place an order successfully", () => {
    // Step 1: Login
    login();

    // Step 2: Select product
    cy.get(".text-lg.block").each(($el, index) => {
      if ($el.text().trim() === shoeName) {
        cy.get("button")
          .contains(/add to cart/i)
          .eq(index)
          .click();
      }
    });

    // Step 3: Check the basket
    cy.get(".bg-qa-clr").should("have.text", "1");

    cy.findByRole("button", { name: /remove from cart/i }).should("be.visible");

    cy.intercept("GET", `${endpoint}ecommerce/cart*`).as("cart");

    cy.get(".bg-qa-clr").click();
    cy.wait("@cart").its("response.statusCode").should("eq", 200);

    cy.url().should("eq", `${endpoint}ecommerce/cart`);

    cy.findByRole("heading", { name: shoeName }).should("be.visible");

    cy.get(".font-bold.text-lg.font-oswald")
      .last()
      .should("contain.text", shoePrice);

    // Step 4: Checkout
    cy.findByRole("button", { name: /checkout/i }).click();

    cy.url().should("eq", `${endpoint}ecommerce/checkout-info`);

    cy.get(`.cursor-no-drop[value="${email}"]`).should("be.disabled");

    // Step 5: Fill checkout form
    cy.findByRole("textbox", { name: /ex. john/i }).type(firstName);
    cy.findByRole("textbox", { name: /ex. doe/i }).type(lastName);

    cy.get(`.form-control[value="${zipCode}"]`).should(
      "have.value",
      `${zipCode}`
    );

    cy.findByRole("button", { name: /continue/i }).click();

    // Step 6: Review order
    cy.url().should("eq", `${endpoint}ecommerce/checkout-overview`);

    cy.get("p.text-md")
      .last()
      .should("contain.text", totalPrice);

    // Step 7: Finish checkout
    cy.findByRole("button", { name: /finish/i }).click();

    cy.url().should("eq", `${endpoint}ecommerce/checkout-complete`);

    cy.findByRole("heading", {
      name: /thank you for your order!/i,
    }).should("have.text", thankYouMessage);
  });
});
