class CategoryApi {
  async request(endpoint, { method = "GET", body } = {}) {
    const response = await fetch(`/api/category${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  // Get all products
  async getAllCategories() {
    return this.request("/get-all-categories");
  }

}

export const categoryApi = new CategoryApi();
