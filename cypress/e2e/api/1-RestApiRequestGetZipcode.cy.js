describe("GET Request Zipcode", () => {
  // Test data initialization
  const restApiUrl = "https://api.zippopotam.us/";
  const countryCode = "us";
  const zipCode = 28270;
  const notExistedZipCode = 11111;
  const country = "United States";
  const stateCode = "NC";
  const stateName = "North Carolina";
  const city = "Charlotte";

  it("should validate the GET request for an existing ZipCode via an API", () => {
    // Step 1: Send GET request to the ZipCode API
    cy.request({
      method: "GET",
      url: `${restApiUrl}${countryCode}/${zipCode}`,
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      // Step 2: Verify the status of the API response
      expect(response.status).to.eq(200); // Assert that the status code is 200 OK
      expect(response.body.country).to.eq(country); // Assert that the country field matches the expected value

      // Step 3: Validate the response data
      const place = response.body.places[0];
      expect(place).to.have.property("place name", city); // Check that the first place in the array has the correct city name
      expect(place).to.have.property("state abbreviation", stateCode); // Check that the state abbreviation is correct
      expect(place.state).to.eq(stateName); // Check that the state name matches the expected value
    });
  });

  it("should validate the GET request for a non-existent ZipCode via an API", () => {
    // Step 1: Send GET request to the ZipCode API for a non-existent ZipCode
    cy.request({
      method: "GET",
      url: `${restApiUrl}${countryCode}/${notExistedZipCode}`,
      headers: {
        Accept: "application/json",
      },
      failOnStatusCode: false, // Prevents failure on 404 response to properly validate the status
    }).then((response) => {
      // Step 2: Verify the status of the API response
      expect(response.status).to.eq(404); // Assert that the status code is 404 Not Found
    });
  });
});
