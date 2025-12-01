describe("POST Request to Create Post", () => {
  it("should create a new post via API", () => {
    // Test data initialization
    const restApiUrl = "https://jsonplaceholder.typicode.com/"; // The base URL of the API
    const path = "posts"; // API endpoint for posts
    const requestBody = {
      // Data to be sent in the POST request body
      title: "testTitle", // Title of the post
      body: "bodyTitle", // Body content of the post
      userId: 1, // User ID associated with the post
    };

    // Step 1: Send POST request to create a new post
    cy.request({
      method: "POST",
      url: `${restApiUrl}${path}`,
      body: requestBody, // Send the request body with the data for the new post
      headers: {
        "Content-Type": "application/json; charset=UTF-8", // Set the correct Content-Type header for JSON data
      },
    }).then((response) => {
      // Step 2: Verify the status of the API response
      expect(response.status).to.eq(201); // Assert that the status code is 201 (Created)

      // Step 3: Validate the response data
      // Validate that the userId in the response matches the request body
      expect(response.body.userId).to.eq(requestBody.userId); // Assert that the userId matches the expected value

      // Validate that the title in the response matches the title sent in the request body
      expect(response.body).to.have.property("title", requestBody.title); // Assert that the 'title' in the response matches the request body

      // Validate that the body in the response matches the body sent in the request body
      expect(response.body).to.have.property("body", requestBody.body); // Assert that the 'body' in the response matches the request body
    });
  });
});
