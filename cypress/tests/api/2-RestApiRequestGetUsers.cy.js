describe("GET Request for User Data", () => {
  // Test data initialization
  const restApiUrl = "https://jsonplaceholder.typicode.com/";
  const path = "users";
  const notExistedPath = "userstest";
  const expectedName = "Kurtis Weissnat";
  const expectedUsername = "Elwyn.Skiles";
  const expectedCity = "Howemouth";
  const expectedCompanyName = "Johns Group";
  const expectedCatchPhrase = "Configurable multimedia task-force";

  it("should validate the GET request for a user through an API", () => {
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

  it("should return 404 status for a non-existent path", () => {
    // Step 1: Send a GET request to the API with a non-existent path
    cy.request({
      method: "GET",
      url: `${restApiUrl}${notExistedPath}/7`, // Construct the URL with a non-existent path (user ID 7)
      headers: {
        Accept: "application/json",
      },
      failOnStatusCode: false, // Don't fail the test on 404 response, so we can check it
    }).then((response) => {
      // Step 2: Assert that the status code is 404 (Not Found)
      expect(response.status).to.eq(404); // Validate that the response code is 404 for non-existent path
    });
  });
});
