class ProductApi {
  async request(endpoint, { method = "GET", body } = {}) {
    const response = await fetch(`/api/products${endpoint}`, {
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
  async getAllProducts() {
    const { products, totalItems } = await this.request("/get-all-products");
    return { products, totalItems };
  }

  // Filter products
  async filterProducts() {
    return this.request("/filter-products");
  }

  // Fetch product by ID
  async fetchProductById(productId) {
    return this.request(`/fetch-product-by-id/${productId}`);
  }

  // Create a new product
  // async createProduct(productData) {
  //   return this.request("/products", {
  //     method: "POST",
  //     body: productData,
  //   });
  // }
}

export const productApi = new ProductApi();
