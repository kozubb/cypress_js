describe("GET Request for User Data", () => {
  it("should validate the GET request for a user through an API", () => {
    // Test data initialization
    const restApiUrl = "https://jsonplaceholder.typicode.com/"; // The base URL of the API
    const path = "users"; // API endpoint for users
    const expectedName = "Kurtis Weissnat"; // Expected name of the user in the API response
    const expectedUsername = "Elwyn.Skiles"; // Expected username of the user in the API response
    const expectedCity = "Howemouth"; // Expected city in the user's address
    const expectedCompanyName = "Johns Group"; // Expected company name of the user
    const expectedCatchPhrase = "Configurable multimedia task-force"; // Expected company catchphrase

    // Step 1: Send GET request to the users API
    cy.request({
      method: "GET",
      url: `${restApiUrl}${path}/7`,
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      // Step 2: Verify the status of the API response
      expect(response.status).to.eq(200); // Assert that the status code is 200 OK

      // Step 3: Validate the response data
      // Validate the user's name
      expect(response.body.name).to.eq(expectedName); // Assert that the name field matches the expected value

      // Validate the username field
      expect(response.body).to.have.property("username", expectedUsername); // Assert that the response contains the expected username

      // Validate the address - specifically the city
      expect(response.body.address).to.have.property("city", expectedCity); // Assert that the city in the address matches the expected value

      // Validate the company name
      expect(response.body.company).to.have.property(
        "name",
        expectedCompanyName
      ); // Assert that the company name is as expected

      // Validate the company catchphrase
      expect(response.body.company.catchPhrase).to.eq(expectedCatchPhrase); // Assert that the company catchphrase matches the expected value
    });
  });
});
