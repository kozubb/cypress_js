describe("PUT Request to Update Post", () => {
  it("should update an existing post via API", () => {
    // Test data initialization
    const restApiUrl = "https://jsonplaceholder.typicode.com/";
    const path = "posts";
    const postId = 1; // ID of the post to update (for example, we are updating post with ID 1)

    // Data to be sent in the PUT request body for updating the post
    const updatedRequestBody = {
      title: "updatedTitle",
      body: "updatedBody",
      userId: 1,
    };

    // Step 1: Send PUT request to update the existing post
    cy.request({
      method: "PUT",
      url: `${restApiUrl}${path}/${postId}`,
      body: updatedRequestBody, // Send the updated data for the post
      headers: {
        "Content-Type": "application/json; charset=UTF-8", // Set the correct Content-Type header for JSON data
      },
    }).then((response) => {
      // Step 2: Verify the status of the API response
      expect(response.status).to.eq(200); // Assert that the status code is 200 (OK) for successful update

      // Step 3: Validate the response data
      // Validate that the post ID in the response matches the requested post ID
      expect(response.body.id).to.eq(postId); // Assert that the ID in the response is the same as the post ID we updated

      // Validate that the title in the response matches the updated title
      expect(response.body).to.have.property("title", updatedRequestBody.title); // Assert that the 'title' in the response matches the updated title

      // Validate that the body in the response matches the updated body
      expect(response.body).to.have.property("body", updatedRequestBody.body); // Assert that the 'body' in the response matches the updated body

      // Validate that the userId in the response matches the userId from the request body
      expect(response.body.userId).to.eq(updatedRequestBody.userId); // Assert that the 'userId' in the response matches the request body
    });
  });
});
