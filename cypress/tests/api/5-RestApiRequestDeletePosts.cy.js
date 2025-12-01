describe("DELETE Request to Remove Post", () => {
  it("should delete an existing post via API", () => {
    // Test data initialization
    const restApiUrl = "https://jsonplaceholder.typicode.com/"; // The base URL of the API
    const path = "posts"; // API endpoint for posts
    const postId = 1; // ID of the post to delete (for example, we are deleting post with ID 1)

    // Step 1: Send DELETE request to remove the existing post
    cy.request({
      method: "DELETE",
      url: `${restApiUrl}${path}/${postId}`,
    }).then((response) => {
      // Step 2: Verify the status of the API response
      expect(response.status).to.eq(200); // Assert that the status code is 200 (OK) for successful deletion
    });
  });
});
